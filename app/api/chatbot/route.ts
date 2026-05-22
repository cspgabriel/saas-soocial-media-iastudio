import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { enforceDailyLimit, resolveGeminiKey, resolvePlan } from "@/lib/aiAccess";

export async function POST(req: NextRequest) {
  try {
    const { message, apiKey } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // SECURITY: server-side verified plan (Authorization: Bearer <Firebase ID token>)
    const auth = await resolvePlan(req);
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
    const { uid, plan } = auth;
    const quota = enforceDailyLimit(uid, plan);
    if (!quota.ok) return quota.response;

    const headerKey = req.headers.get("x-gemini-api-key");
    const key = apiKey
      ? { apiKey, source: "user" as const, error: null }
      : resolveGeminiKey(headerKey ? req : req, plan);

    if (!key.apiKey || key.error) {
      return NextResponse.json({ error: key.error }, { status: 402 });
    }

    const ai = new GoogleGenAI({ apiKey: key.apiKey });

    const systemPrompt = `Você é um assistente de IA integrado ao SocialOS (um SaaS de gestão de redes sociais).
Você tem acesso (hipotético) às informações das contas do usuário que gere clientes de social media. 
Seja prestativo, dê insights sobre horários de postagem, ideias de conteúdo, dicas de engajamento e melhorias na copy.
Use sempre o idioma português do Brasil. Formate sua resposta em Markdown, destacando pontos importantes.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: systemPrompt
      }
    });

    return NextResponse.json({
      text: response.text,
      usage: { plan, keySource: key.source, remaining: quota.remaining, limit: quota.limit },
    });
  } catch (error) {
    console.error("Chatbot API error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}

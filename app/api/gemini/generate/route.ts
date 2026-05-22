import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { enforceDailyLimit, resolveGeminiKey, resolvePlan } from "@/lib/aiAccess";

export async function POST(req: NextRequest) {
  try {
    const { prompt, tone, platform } = await req.json();
    // SECURITY: server-side verified plan (Authorization: Bearer <Firebase ID token>)
    const auth = await resolvePlan(req);
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
    const { uid, plan } = auth;
    const quota = enforceDailyLimit(uid, plan);
    if (!quota.ok) return quota.response;

    const key = resolveGeminiKey(req, plan);
    if (!key.apiKey || key.error) {
      return NextResponse.json({ error: key.error }, { status: 402 });
    }

    const systemPrompt = `Você é um social media manager experiente e copywriter de alta conversão. Seu objetivo é escrever uma legenda perfeita para ${platform} com o seguinte tema: "${prompt}", e usando um tom de voz "${tone}". 

Regras:
1. Comece com um gancho forte que prenda a atenção do usuário no primeiro segundo.
2. Formate bem os parágrafos para leitura dinâmica (use quebras de linha reais).
3. Se fizer sentido, use emojis na medida certa (não exagere).
4. Termine com uma Call-to-Action (CTA) clara (Ex: Comente abaixo, acesse o link, salve o post).
5. Inclua um bloco de 5 a 10 hashtags estratégicas no final.
6. Apenas retorne a legenda final pronta para copiar e colar, não explique o que você fez.`;

    const ai = new GoogleGenAI({ apiKey: key.apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt,
    });

    return NextResponse.json({
      text: response.text,
      usage: { plan, keySource: key.source, remaining: quota.remaining, limit: quota.limit },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate content." },
      { status: 500 }
    );
  }
}

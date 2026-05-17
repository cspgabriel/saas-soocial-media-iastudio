import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, apiKey } = await req.json();

    if (!message || !apiKey) {
      return NextResponse.json({ error: "Message and API Key are required" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });

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

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Chatbot API error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}

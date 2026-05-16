import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prompt, tone, platform } = await req.json();

    const systemPrompt = `Você é um social media manager experiente e copywriter de alta conversão. Seu objetivo é escrever uma legenda perfeita para ${platform} com o seguinte tema: "${prompt}", e usando um tom de voz "${tone}". 

Regras:
1. Comece com um gancho forte que prenda a atenção do usuário no primeiro segundo.
2. Formate bem os parágrafos para leitura dinâmica (use quebras de linha reais).
3. Se fizer sentido, use emojis na medida certa (não exagere).
4. Termine com uma Call-to-Action (CTA) clara (Ex: Comente abaixo, acesse o link, salve o post).
5. Inclua um bloco de 5 a 10 hashtags estratégicas no final.
6. Apenas retorne a legenda final pronta para copiar e colar, não explique o que você fez.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt,
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate content." },
      { status: 500 }
    );
  }
}

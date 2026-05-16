import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `Analise o perfil do Instagram: @${username}. 
Pesquise na internet as informações mais recentes sobre esse perfil público no Instagram usando a ferramenta de busca.

Forneça uma análise de marketing digital para esse perfil. Divida a resposta nas seguintes seções em Markdown:
1. **Bio e Avatar**: A bio está atrativa? A foto do perfil transmite profissionalismo ou adequação ao nicho? Tem call to action?
2. **Estratégia de Conteúdo**: Avalie os últimos posts ou o estilo do conteúdo. O que estão fazendo certo e o que poderia melhorar.
3. **Engajamento e Audiência**: Dicas para aumentar o engajamento desse perfil com base no nicho percebido.
4. **Oportunidades**: O que o perfil poderia começar a fazer agora para ter mais resultados?

Se você não conseguir encontrar o perfil por ser privado ou inexistente, forneça uma análise genérica e dicas de ouro para o nicho de @${username}, mas sempre comece avisando que não foi possível ler o perfil exato. O tom deve ser de um especialista em social media sênior (encorajador, direto, foco em conversão e engajamento).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      tools: [{ googleSearch: {} }],
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Failed to generate analysis" }, { status: 500 });
  }
}

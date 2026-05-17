import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sourceText } = await req.json();

    if (!sourceText) {
      return NextResponse.json({ error: "Texto base é obrigatório" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `Com base no seguinte texto/notícia/informação, crie a estrutura para um post de carrossel de Instagram atraente, viral e educativo de até 10 slides.
    
    Texto base:
    ${sourceText}

    O formato de saída deve ser em Markdown, com a seguinte estrutura para cada slide:
    Slide 1: [TEXTO DO SLIDE] - [SUGESTÃO VISUAL]
    ...
    
    Lembretes:
    - O Slide 1 deve ter um título gancho (hook) extremament chamativo.
    - O Último Slide deve ter uma CTA (Call to action) clara (salvar, compartilhar, comentar).
    - Escreva frases curtas e fáceis de ler para a arte do carrossel. Não faça blocos densos de texto.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Carousel generation error:", error);
    return NextResponse.json({ error: "Erro ao gerar carrossel" }, { status: 500 });
  }
}

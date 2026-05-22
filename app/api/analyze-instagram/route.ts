import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { enforceDailyLimit, resolveGeminiKey, resolvePlan } from "@/lib/aiAccess";

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

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

    const ai = new GoogleGenAI({ apiKey: key.apiKey });

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
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return NextResponse.json({
      text: response.text,
      usage: { plan, keySource: key.source, remaining: quota.remaining, limit: quota.limit },
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Failed to generate analysis" }, { status: 500 });
  }
}

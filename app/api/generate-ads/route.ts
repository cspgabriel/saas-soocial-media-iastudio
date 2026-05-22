import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { enforceDailyLimit, resolveGeminiKey, resolvePlan } from "@/lib/aiAccess";

export async function POST(req: NextRequest) {
  try {
    const { platform, objective, targetAudience, product, extras } = await req.json();

    if (!platform || !objective || !product) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }

    // SECURITY: verifies Firebase ID token (Authorization: Bearer ...) and loads
    // plan from Firestore users/{uid}.plan — NOT from the spoofable x-socialos-plan header.
    const auth = await resolvePlan(req);
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const { uid, plan } = auth;

    const quota = enforceDailyLimit(uid, plan);
    if (!quota.ok) return quota.response;

    const key = resolveGeminiKey(req, plan);
    if (!key.apiKey || key.error) {
      return NextResponse.json({ error: key.error }, { status: 402 });
    }

    const ai = new GoogleGenAI({ apiKey: key.apiKey });

    const prompt = `Atue como um especialista em tráfego pago para ${platform}.
    Crie uma estrutura completa de campanha baseada nos seguintes dados:
    Plataforma: ${platform}
    Objetivo: ${objective}
    Público-Alvo: ${targetAudience}
    Produto/Serviço: ${product}
    Informações Extras: ${extras}

    A resposta deve ser em Markdown e incluir:
    1. Estrutura da Campanha (Nome, Orçamento sugerido, Estratégia de Lance)
    2. Estrutura dos Conjuntos de Anúncios/AdGroups (Segmentação, Posicionamentos, Interesses/Palavras-chave)
    3. 3 Opções de Criativos (Copys completas com Títulos, Textos Principais, Descrições e sugestão direcional do criativo visual ou vídeo).

    Adejte os termos e estratégias ao jargão nativo utilizado especificamente pelo ${platform}.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      text: response.text,
      usage: { plan, keySource: key.source, remaining: quota.remaining, limit: quota.limit },
    });
  } catch (error) {
    console.error("Ads generation error:", error);
    return NextResponse.json({ error: "Erro ao gerar campanha" }, { status: 500 });
  }
}

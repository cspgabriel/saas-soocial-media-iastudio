import { NextRequest, NextResponse } from "next/server";

type Plan = "free" | "pro" | "scale";

const DAILY_LIMITS: Record<Plan, number> = {
  free: 30,
  pro: 300,
  scale: 1200,
};

const usage = new Map<string, { day: string; count: number }>();

function getClientId(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return req.headers.get("x-socialos-user") || forwardedFor || "anonymous";
}

function getDayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function resolvePlan(req: NextRequest): Plan {
  const rawPlan = req.headers.get("x-socialos-plan")?.toLowerCase();
  if (rawPlan === "pro" || rawPlan === "scale") return rawPlan;
  return "free";
}

export function resolveGeminiKey(req: NextRequest, plan: Plan) {
  const userKey = req.headers.get("x-gemini-api-key")?.trim();

  if (plan === "free") {
    return {
      apiKey: userKey,
      source: "user" as const,
      error: userKey ? null : "Plano grátis exige a chave Gemini do próprio cliente.",
    };
  }

  const managedKey = process.env.GEMINI_API_KEY?.trim();
  return {
    apiKey: managedKey || userKey,
    source: managedKey ? ("managed" as const) : ("user" as const),
    error: managedKey || userKey ? null : "Configure GEMINI_API_KEY no servidor.",
  };
}

export function enforceDailyLimit(req: NextRequest, plan: Plan) {
  const day = getDayKey();
  const key = `${day}:${plan}:${getClientId(req)}`;
  const entry = usage.get(key);
  const current = entry?.day === day ? entry.count : 0;
  const limit = DAILY_LIMITS[plan];

  if (current >= limit) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: `Limite diario do plano ${plan} atingido (${limit} geracoes).` },
        { status: 429 }
      ),
    };
  }

  usage.set(key, { day, count: current + 1 });
  return { ok: true, remaining: limit - current - 1, limit };
}

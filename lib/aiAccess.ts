import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "./firebase-admin";

type Plan = "free" | "pro" | "scale";

const DAILY_LIMITS: Record<Plan, number> = {
  free: 30,
  pro: 300,
  scale: 1200,
};

const usage = new Map<string, { day: string; count: number }>();

function getDayKey() {
  return new Date().toISOString().slice(0, 10);
}

export type ResolvedAuth =
  | { ok: true; uid: string; plan: Plan }
  | { ok: false; status: 401; error: string };

// SECURITY: plan is now read server-side from verified user doc, NOT from client header.
// Previous implementation read `x-socialos-plan` header — trivially spoofable via curl.
// TODO: migrate paid users — set `plan` in `users/{uid}` via Admin SDK from payment webhook
//       (Stripe/Pagar.me Cloud Function). During transition, pro/scale users without
//       a Firestore doc will be temporarily downgraded to 'free' until their doc is written.
export async function resolvePlan(req: NextRequest): Promise<ResolvedAuth> {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    return { ok: false, status: 401, error: "Missing Bearer token. Please re-login." };
  }
  const idToken = authHeader.slice(7).trim();
  if (!idToken) {
    return { ok: false, status: 401, error: "Empty ID token." };
  }

  try {
    const decoded = await adminAuth().verifyIdToken(idToken);
    const uid = decoded.uid;

    let plan: Plan = "free";
    try {
      const snap = await adminDb().collection("users").doc(uid).get();
      const data = snap.data();
      const raw = (data?.plan as string | undefined)?.toLowerCase();
      if (raw === "pro" || raw === "scale") plan = raw;
    } catch (err) {
      console.error("Failed to read user doc, defaulting to free plan:", err);
    }

    return { ok: true, uid, plan };
  } catch (err) {
    console.error("Invalid Firebase ID token:", err);
    return { ok: false, status: 401, error: "Invalid or expired session. Please re-login." };
  }
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

// SECURITY: quota keyed by verified uid (not spoofable header)
export function enforceDailyLimit(uid: string, plan: Plan) {
  const day = getDayKey();
  const key = `${day}:${plan}:${uid}`;
  const entry = usage.get(key);
  const current = entry?.day === day ? entry.count : 0;
  const limit = DAILY_LIMITS[plan];

  if (current >= limit) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { error: `Limite diario do plano ${plan} atingido (${limit} geracoes).` },
        { status: 429 }
      ),
    };
  }

  usage.set(key, { day, count: current + 1 });
  return { ok: true as const, remaining: limit - current - 1, limit };
}

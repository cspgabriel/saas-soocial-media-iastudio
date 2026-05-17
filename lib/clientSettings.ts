export function getAiRequestHeaders(): HeadersInit {
  if (typeof window === "undefined") return { "Content-Type": "application/json" };

  const plan = localStorage.getItem("socialos_plan") || "free";
  const key = localStorage.getItem("socialos_gemini_key") || "";

  return {
    "Content-Type": "application/json",
    "x-socialos-plan": plan,
    ...(key ? { "x-gemini-api-key": key } : {}),
  };
}

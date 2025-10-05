const PLAN_KEY = "user-plans";

type Plan = "free" | "pro";

type PlanMap = Record<string, Plan>;

function safeLS() {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

function readPlans(): PlanMap {
  const ls = safeLS();
  if (!ls) return {};
  try {
    return JSON.parse(ls.getItem(PLAN_KEY) || "{}") as PlanMap;
  } catch {
    return {};
  }
}

function writePlans(map: PlanMap) {
  const ls = safeLS();
  if (!ls) return;
  ls.setItem(PLAN_KEY, JSON.stringify(map));
}

export function getPlan(email?: string | null): Plan {
  if (!email) return "free";
  const map = readPlans();
  return map[email.toLowerCase()] || "free";
}

export function setPlan(email: string, plan: Plan) {
  const map = readPlans();
  map[email.toLowerCase()] = plan;
  writePlans(map);
}

export function isPro(email?: string | null) {
  return getPlan(email || null) === "pro";
}

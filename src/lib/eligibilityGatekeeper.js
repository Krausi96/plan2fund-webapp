/**
 * eligibilityGatekeeper.js (deterministic stub)
 */
import { loadEligibilityRules } from "./supabaseLoader";

export async function checkEligibility(profile) {
  const schema = await loadEligibilityRules();
  const req = schema.required || [];
  for (const k of req) {
    if (profile[k] === undefined || profile[k] === null || (typeof profile[k] === "string" && profile[k].trim() === "")) {
      return { eligible: false, reason: "missing:" + k };
    }
  }
  const country = (profile.country || "").toUpperCase();
  const okCountry = ["AT","DE","EU","OTHER"].indexOf(country) >= 0;
  if (!okCountry) return { eligible: false, reason: "country" };
  return { eligible: true, reason: "stub" };
}
export default { checkEligibility };

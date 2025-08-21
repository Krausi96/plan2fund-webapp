/**
 * supabaseLoader.js (staged)
 */
import flags from "../config/flags.json";

export async function loadPrograms() {
  if (!flags.SUPABASE_ENABLED) {
    const local = await import("../data/programs.catalog.json");
    return local.default || local;
  }
  return [];
}

export async function loadEligibilityRules() {
  const schema = await import("../config/eligibility.schema.json");
  return schema.default || schema;
}
export default { loadPrograms, loadEligibilityRules };

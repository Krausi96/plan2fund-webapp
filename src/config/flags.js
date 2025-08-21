/**
 * Feature flags for Plan2Fund.
 * Uses Vite env (VITE_*). Defaults: RECO off, PLAN on, PAYWALL off.
 */
const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
export const flags = {
  RECO_ENGINE_V1: env.VITE_RECO_ENGINE_V1 === 'true' ? true : false,
  PLAN_GENERATOR_V1: env.VITE_PLAN_GENERATOR_V1 === 'false' ? false : true,
  PAYWALL_ENABLED: env.VITE_PAYWALL_ENABLED === 'true' ? true : false
};
export default flags;
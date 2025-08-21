/**
 * Deterministic scoring core (MVP Step 1).
 * Pure functions only; no side effects. Safe fallback when flag off.
 */
import { flags } from "../config/flags.js";
import config from "../data/scoring.config.json";

/** Merge user answers with safe defaults */
function normalizeAnswers(input = {}) {
  const a = {
    country: "AT",
    sector: "AI",
    team_size: 1,
    has_company: false,
    trl: 2,
    revenue_eur: 0,
    ip: false,
    docs_ready: [],
    ...input
  };
  a.team_size = Number.isFinite(a.team_size) ? a.team_size : 1;
  a.trl = Math.max(1, Math.min(9, Number(a.trl || 2)));
  a.revenue_eur = Number(a.revenue_eur || 0);
  a.docs_ready = Array.isArray(a.docs_ready) ? a.docs_ready : [];
  return a;
}

/** Heuristic stage from answers */
function inferStage(a) {
  if (a.revenue_eur > 0 || a.trl >= 6) return "seed";
  return "preseed";
}

/** Clamp helper */
function clamp01(x) { return Math.max(0, Math.min(1, x)); }

/** Score a single program */
function scoreProgram(program, a, cfg) {
  const w = cfg.weights;

  // Fit
  const loc = (program.country ? (program.country === a.country ? 1 : 0) : 0.5);
  const focus = (Array.isArray(program.focus) && program.focus.length)
    ? (program.focus.includes(a.sector) ? 1 : 0)
    : 0.5;
  const stageWanted = program.stage && program.stage.length ? program.stage : ["preseed","seed"];
  const stageMatch = stageWanted.includes(inferStage(a)) ? 1 : 0;
  const companyOk = (program.requires_company ? (a.has_company ? 1 : 0) : 1);
  const ipOk = (program.requires_ip ? (a.ip ? 1 : 0) : 1);
  const fit = clamp01((loc + focus + stageMatch + companyOk + ipOk) / 5);

  // Readiness
  const team = clamp01((a.team_size >= 2 ? 1 : 0.6));
  const trl = clamp01((a.trl - 1) / 8);
  const docsList = ["pitch","financials","founder_cvs","bp_draft"];
  const docs = clamp01(docsList.filter(d => a.docs_ready.includes(d)).length / docsList.length);
  const readiness = clamp01((team + trl + docs) / 3);

  // Effort (lower is better). Approx from cofunding + complexity.
  const cofund = (typeof program.cofunding_ratio === "number") ? clamp01(program.cofunding_ratio) : 0.5;
  const complexity = (typeof program.application_complexity === "number") ? clamp01(program.application_complexity) : 0.5;
  const effort = clamp01((cofund + complexity) / 2); // 0 easy .. 1 hard

  // Confidence from input completeness and rule coverage
  const answered = ["country","sector","team_size","has_company","trl","revenue_eur","ip","docs_ready"]
    .filter(k => a[k] !== undefined && a[k] !== null).length;
  const completeness = clamp01(answered / 8);
  const rulesCovered = clamp01((3 + (program.focus ? 1 : 0) + (program.stage ? 1 : 0)) / 5);
  const confidence = clamp01((completeness * 0.7) + (rulesCovered * 0.3));

  // Composite (higher better). Effort contributes as (1 - effort).
  const composite =
    w.fit * fit +
    w.readiness * readiness +
    w.confidence * confidence +
    w.effort * (1 - effort);

  const rationale = [];
  if (loc === 1) rationale.push("Location match");
  if (focus === 1) rationale.push("Sector/focus match");
  if (stageMatch === 1) rationale.push("Stage alignment");
  if (companyOk === 1 && program.requires_company) rationale.push("Company requirement met");
  if (ipOk === 1 && program.requires_ip) rationale.push("IP requirement met");
  if (rationale.length === 0) rationale.push("General eligibility (partial match)");

  const checklist = ["Pitch deck", "Financial plan", "Founder CVs", "Business plan draft"];
  if (cofund > 0) checklist.push("Cofunding evidence (bank/VC/own funds)");

  return {
    programId: program.id,
    name: program.name,
    scores: {
      fit: Math.round(fit * 100),
      readiness: Math.round(readiness * 100),
      effort: Math.round(effort * 100),           // lower is better
      confidence: Math.round(confidence * 100),
      composite: Math.round(clamp01(composite) * 100)
    },
    rationale,
    checklist
  };
}

/** Public API */
export function scoreAll(answers, programs) {
  const a = normalizeAnswers(answers);
  const catalog = Array.isArray(programs) ? programs : [];
  const cfg = config;

  // Safe fallback when RECO flag is off: rank by simple heuristics.
  if (!flags.RECO_ENGINE_V1) {
    return catalog
      .map(p => {
        const base = 0.5;
        const loc = (p.country === a.country) ? 0.2 : 0;
        const grant = Math.min(1, (p.max_grant_eur || 0) / 300000) * 0.3;
        const composite = base + loc + grant;
        return {
          programId: p.id,
          name: p.name,
          scores: {
            fit: Math.round((base + loc) * 100),
            readiness: 60,
            effort: 50,
            confidence: 50,
            composite: Math.round(clamp01(composite) * 100)
          },
          rationale: ["Fallback ranking (flag RECO_ENGINE_V1=false)"],
          checklist: ["Pitch deck","Financial plan","Founder CVs","Business plan draft"]
        };
      })
      .sort((x,y) => y.scores.composite - x.scores.composite);
  }

  // Full scoring
  return catalog
    .map(p => scoreProgram(p, a, cfg))
    .sort((x,y) => y.scores.composite - x.scores.composite);
}

export default { scoreAll };

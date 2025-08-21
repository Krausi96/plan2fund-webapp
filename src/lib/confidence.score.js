/**
 * Deterministic confidence bands from rule hits.
 * A: score>=80 and no mandatory fails; B: score>=50 and no mandatory fails; else C.
 */
export function computeConfidence(program = {}, evaluation = {}) {
  const evald = Array.isArray(evaluation.rulesEvaluated) ? evaluation.rulesEvaluated : [];
  const total = evald.length || 0;
  const passed = evald.filter(r => r && r.passed === true);
  const mandatoryFailed = evald.some(r => r && r.mandatory === true && r.passed !== true);
  const score = total === 0 ? 0 : Math.round((passed.length / total) * 100);
  let band = "C";
  if (!mandatoryFailed) {
    if (score >= 80) band = "A";
    else if (score >= 50) band = "B";
  }
  const specificity = r => {
    if (r && r.details && Array.isArray(r.details.conditions)) return r.details.conditions.length;
    if (r && typeof r.description === "string") return r.description.length;
    return 0;
  };
  const supportingRules = passed.slice().sort((a,b)=>specificity(b)-specificity(a)).slice(0,3).map(r=>({
    id: r && r.id || null,
    description: r && r.description || "Rule passed",
    anchor: (r && (r.anchor || r.link)) || null
  }));
  const anchors = []
    .concat((program && program.corpus && program.corpus.sources) || [])
    .concat(program && program.links || [])
    .filter(Boolean).slice(0,5);
  return { band, score, supportingRules, anchors };
}

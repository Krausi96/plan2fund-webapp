/**
 * Simple local eligibility engine to avoid network calls.
 * Rules supported: { id, description, mandatory?, passed? (auto if fn), details }
 */
export function evaluateEligibility(program, answers) {
  const rules = [];
  // co-funding rule
  if (typeof program.cofundMin === "number") {
    const ok = (Number(answers.cofund || 0) >= Number(program.cofundMin));
    rules.push({ id:"cofund", description:`Cofunding >= ${Math.round(program.cofundMin*100)}%`, mandatory:true, passed: ok });
  }
  // sector match (soft)
  if (Array.isArray(program.sectors) && answers.sector) {
    const ok = program.sectors.map(s=>String(s).toLowerCase()).includes(String(answers.sector).toLowerCase());
    rules.push({ id:"sector", description:`Sector match: ${answers.sector}`, mandatory:false, passed: ok });
  }
  // keyword hit (soft)
  if (Array.isArray(program.keywords) && answers.idea) {
    const idea = String(answers.idea).toLowerCase();
    const hit = program.keywords.some(k => idea.indexOf(String(k).toLowerCase()) >= 0);
    rules.push({ id:"keywords", description:"Idea includes program-relevant keywords", mandatory:false, passed: hit });
  }
  const unmet = rules.filter(r=>r.mandatory && !r.passed).map(r=>r.id);
  return { rulesEvaluated: rules, unmetMandatory: unmet };
}

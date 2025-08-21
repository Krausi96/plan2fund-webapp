const KEYWORDS = {
  AI: ["ai","gpt","machine learning","ml","computer vision","nlp","llm","gen ai","generative"],
  SaaS: ["saas","subscription","monthly recurring","mrr","b2b software"],
  DeepTech: ["semiconductor","biotech","materials","robotics","quantum","photonic"],
  Climate: ["co2","emission","climate","energy storage","solar","wind","hydrogen"],
  Health: ["health","medtech","diagnostic","clinical","patient"]
};

function affinityBoost(idea, sector){
  if(!idea || !sector) return 0;
  const bag = idea.toLowerCase();
  const kws = KEYWORDS[sector] || [];
  return kws.some(k => bag.includes(k)) ? 0.6 : 0;
}
function daysUntil(deadlineIso){
  if(!deadlineIso) return 365;
  const d = new Date(deadlineIso);
  const now = new Date();
  return Math.ceil((d - now) / 86400000);
}

export function rank(programs, inputs){
  const { sector, idea = "", cofund_ratio = 0.3 } = inputs || {};
  const out = [];
  for (const p of programs || []) {
    // soft-compat without separate compliance/match modules
    const compliant = true; // filtering can be added by caller if needed
    if (!compliant) continue;

    const overlap = Array.isArray(p.sectors) && sector ? (p.sectors.includes(sector) ? 1 : 0) : 0;
    const boost = affinityBoost(idea, sector);
    const days = daysUntil(p.deadline_iso);

    let deadlineBoost = days <= 30 ? 0.4 : (days <= 90 ? 0.2 : 0);
    let cofundAdj = (cofund_ratio >= (p.cofund_ratio ?? 0.3)) ? 0.3 : -0.2;

    const score = 0.5 + overlap*0.7 + boost + deadlineBoost + cofundAdj;
    const reasons = [
      overlap ? "Sector match" : "General fit",
      boost ? "Keyword affinity in idea" : null,
      deadlineBoost ? `Deadline in ${days} days` : null,
      cofundAdj > 0 ? "Cofunding looks sufficient" : "Cofunding might be insufficient"
    ].filter(Boolean);

    out.push({ program: p, score, reasons, days_to_deadline: days });
  }
  return out.sort((a,b)=>b.score-a.score).slice(0,10);
}
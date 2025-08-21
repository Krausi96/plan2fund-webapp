/* ASCII only; deterministic token builders (no AI). */
export const safeText = (v, hint) => {
  if (!v || (typeof v === "string" && v.trim() === "")) return `[missing: ${hint}]`;
  return String(v).trim();
};

export function buildProblem(a) {
  return [
    "Problem",
    `Customers: ${safeText(a.icp?.segment, "target segment")}`,
    `Pain: ${safeText(a.problem?.pain, "pain point")}`,
    `Context: ${safeText(a.market?.context, "industry context")}`
  ].join("\\n\\n");
}

export function buildSolution(a) {
  return [
    "Solution",
    `Offer: ${safeText(a.solution?.offer, "offer summary")}`,
    `Differentiation: ${safeText(a.solution?.edge, "differentiation")}`,
    `Benefits: ${safeText(a.solution?.benefits, "key benefits")}`
  ].join("\\n\\n");
}

export function buildMarket(a) {
  return [
    "Market",
    `Region: ${safeText(a.market?.region, "region")}`,
    `TAM/SAM/SOM: ${safeText(a.market?.size, "market size")}`,
    `Competitors: ${safeText(a.market?.competitors, "competitors")}`
  ].join("\\n\\n");
}

export function buildICP(a) {
  return [
    "Ideal Customer Profile",
    `Segment: ${safeText(a.icp?.segment, "segment")}`,
    `Buyer: ${safeText(a.icp?.buyer, "buyer role")}`,
    `Budget/Triggers: ${safeText(a.icp?.triggers, "budget/triggers")}`
  ].join("\\n\\n");
}

export function buildGTM(a) {
  return [
    "Go-To-Market",
    `Channels: ${safeText(a.gtm?.channels, "channels")}`,
    `Messaging: ${safeText(a.gtm?.messaging, "messaging")}`,
    `Pricing: ${safeText(a.gtm?.pricing, "pricing model")}`
  ].join("\\n\\n");
}

export function buildTeam(a) {
  return [
    "Team",
    `Founders: ${safeText(a.team?.founders, "founders")}`,
    `Capabilities: ${safeText(a.team?.capabilities, "capabilities")}`,
    `Gaps: ${safeText(a.team?.gaps, "hiring gaps")}`
  ].join("\\n\\n");
}

export function buildMilestones(a) {
  return [
    "Milestones",
    `Done: ${safeText(a.milestones?.done, "delivered to date")}`,
    `Next 90d: ${safeText(a.milestones?.next90, "next 90 days")}`,
    `Roadmap: ${safeText(a.milestones?.roadmap, "roadmap highlights")}`
  ].join("\\n\\n");
}

export function buildFinancials(a) {
  return [
    "Financials (Placeholder)",
    `Model: ${safeText(a.financials?.model, "unit economics / model type")}`,
    `12-18m View: ${safeText(a.financials?.plan, "financial plan outline")}`,
    `Ask/Funding: ${safeText(a.financials?.ask, "funding ask / use of funds")}`
  ].join("\\n\\n");
}

export const SECTION_BUILDERS = [
  ["Problem", buildProblem],
  ["Solution", buildSolution],
  ["Market", buildMarket],
  ["ICP", buildICP],
  ["GTM", buildGTM],
  ["Team", buildTeam],
  ["Milestones", buildMilestones],
  ["Financials", buildFinancials]
];

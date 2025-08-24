import React from "react";
export default function PlanCTA({ answers }) {
  const keys = ["icp.segment","problem.pain","market.context","solution.offer","solution.edge","solution.benefits","market.region","market.size","market.competitors","icp.buyer","icp.triggers","gtm.channels","gtm.messaging","gtm.pricing","team.founders","team.capabilities","team.gaps","milestones.done","milestones.next90","milestones.roadmap"];
  const has = (obj, path) => path.split(".").reduce((o,k)=> (o && o[k]!==undefined ? o[k] : undefined), obj);
  const filled = keys.filter(k => { const v = has(answers||{}, k); return v && String(v).trim() !== ""; }).length;
  const pct = Math.round((filled / keys.length) * 100);
  return (
    <aside className="plan-cta" style={{border:"1px solid #e5e7eb", padding:"12px", borderRadius:"8px"}}>
      <h3>What’s included</h3>
      <ul>
        <li>✓ Submission-ready structure (editable export)</li>
        <li>✓ 1-page Executive Summary</li>
        <li>✓ 1 free revision (communicated)</li>
      </ul>
      <h4 style={{marginTop:"8px"}}>Compliance Readiness</h4>
      <p>Eligibility coverage (self-reported): <strong>{pct}%</strong></p>
      <h4 style={{marginTop:"8px"}}>Docs checklist</h4>
      <ul>
        <li>• Founder CV(s)</li>
        <li>• ID/Registration as required</li>
        <li>• Financial assumptions</li>
      </ul>
      <div style={{marginTop:"12px", opacity:0.6}}>
        <button disabled style={{padding:"8px 12px", borderRadius:"6px"}} title="Coming soon">Continue to Checkout (soon)</button>
      </div>
    </aside>
  );
}

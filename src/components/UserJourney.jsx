import React from "react";

export default function UserJourney() {
  const items = [
    "Fill product details: name, problem, segment, USP, pricing, traction.",
    "Compare recommended funding programs by Fit, Readiness, Effort, Confidence.",
    "Download a CSV of ranked programs to share.",
    "Save an HTML-lite summary for drafts and emails.",
    "Follow a document checklist: pitch, financials, CVs, BP draft, co-funding proof.",
    "Flag favorites to revisit in the Plan step.",
    "Preview a token-based Business Plan section (stub)."
  ];
  return (
    <section style={{marginTop:"16px"}}>
      <h3 style={{margin:"0 0 8px 0"}}>After this, you can:</h3>
      <ul>
        {items.map((t, i) => (<li key={i}>{t}</li>))}
      </ul>
    </section>
  );
}
import React, { useMemo } from "react";
import { scoreAll } from "../lib/scoring";
import programs from "../data/programs.catalog.json";
import { buildCsv, buildHtmlLite, downloadBlob } from "../lib/exporters";
import UserJourney from "./UserJourney";

function normalizePrograms(p) {
  return Array.isArray(p) ? p : [];
}

export default function Results() {
  const catalog = normalizePrograms(programs);
  const answers = {}; // stub: wire actual answers when Q&A normalization lands
  let ranked = [];
  try {
    ranked = scoreAll(catalog, answers);
  } catch (e) {
    ranked = catalog.map((pg, i) => ({
      program: pg,
      score: 50,
      details: { fit: 50, readiness: 45, effort: 65, confidence: 40 },
      rationale: "Default rationale (fallback)."
    }));
  }

  const safeRanked = useMemo(() => Array.isArray(ranked) ? ranked : [], [ranked]);

  const onExportCsv = () => {
    const csv = buildCsv(safeRanked);
    downloadBlob("plan2fund_results.csv", "text/csv;charset=utf-8", csv);
  };

  const onExportHtml = () => {
    const html = buildHtmlLite(safeRanked);
    downloadBlob("plan2fund_results.html", "text/html;charset=utf-8", html);
  };

  return (
    <div style={{padding:"16px"}}>
      <h2 style={{margin:"0 0 12px 0"}}>Recommended Programs</h2>

      {safeRanked.length === 0 && (
        <div style={{border:"1px solid #ddd", padding:"12px"}}>
          No matches yet. Please complete the Recommendation questions.
        </div>
      )}

      {safeRanked.length > 0 && (
        <div style={{margin:"0 0 12px 0"}}>
          <button onClick={onExportCsv} style={{marginRight:"8px"}}>Export CSV</button>
          <button onClick={onExportHtml}>Save HTML</button>
        </div>
      )}

      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"12px"}}>
        {safeRanked.map((r, idx) => {
          const n = r.program && r.program.name ? r.program.name : "Program";
          const d = r.details || {};
          return (
            <article key={r.program && r.program.id ? r.program.id : idx} style={{border:"1px solid #ddd", borderRadius:"8px", padding:"12px"}}>
              <header style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <strong>{idx + 1}. {n}</strong>
                <span title="Composite score">{r.score ?? "-"}</span>
              </header>
              <div style={{marginTop:"8px", display:"flex", gap:"8px", flexWrap:"wrap"}}>
                <Badge label="Fit" value={d.fit} />
                <Badge label="Readiness" value={d.readiness} />
                <Badge label="Effort" value={d.effort} />
                <Badge label="Confidence" value={d.confidence} />
              </div>
              <p style={{marginTop:"8px"}}>{r.rationale || "?"}</p>
            </article>
          );
        })}
      </div>

      <UserJourney />
      <Checklist />
    </div>
  );
}

function Badge({ label, value }) {
  const v = (value === 0 || value) ? String(value) : "-";
  const s = { border:"1px solid #ccc", borderRadius:"12px", padding:"2px 8px", fontSize:"12px" };
  return <span style={s}>{label}: {v}</span>;
}

function Checklist() {
  const docs = [
    "Pitch deck (10-15 slides)",
    "Business plan draft (latest)",
    "Financial plan (12-24 months)",
    "CVs of founders",
    "Evidence of co-funding or runway",
    "Letters of intent or traction proof"
  ];
  return (
    <section style={{marginTop:"16px"}}>
      <h3 style={{margin:"0 0 8px 0"}}>Document checklist</h3>
      <ul>{docs.map((d, i) => <li key={i}>{d}</li>)}</ul>
    </section>
  );
}
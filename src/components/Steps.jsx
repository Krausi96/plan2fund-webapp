
import React from "react";
import Reveal from "./Reveal.jsx";

export default function Steps() {
  const steps = [
    { t: "Choose path", d: "Find funding or create a plan" },
    { t: "Fill essentials", d: "We keep inputs minimal and guide you" },
    { t: "Eligibility & score", d: "See badges, confidence and gaps" },
    { t: "Preview & pricing", d: "See complexity, timeline options" },
    { t: "Export", d: "Submission‑ready documents" }
  ];
  return (
    <section className="section">
      <div className="container">
        <h2 className="reveal">How it works</h2>
        <ol style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16, padding:0, margin:0, listStyle:"none"}}>
          {steps.map((s, idx) => (
            <Reveal key={idx} delay={idx*60}>
              <li className="card">
                <div style={{fontSize:12, opacity:.7, marginBottom:6}}>Step {idx+1}</div>
                <div style={{fontWeight:600}}>{s.t}</div>
                <div style={{opacity:.85}}>{s.d}</div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

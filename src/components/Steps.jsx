import React from "react"; import Reveal from "./Reveal";
export default function Steps(){ const steps=[{title:"Choose your path",body:"Find funding or generate a plan (or both)."}, {title:"Answer only what is needed",body:"We prefill and guide; upload drafts if you have them."}, {title:"Eligibility and confidence",body:"We surface requirements and confidence early."}, {title:"Preview and export",body:"Get a submission-ready document and next steps."}];
  return (<section className="section"><div className="container"><Reveal>
    <h2 style={{fontSize:"var(--fs-2xl)",margin:"0 0 12px"}}>How it works</h2>
    <ol style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:16,padding:0,margin:0,listStyle:"none"}}>{steps.map((s,i)=>(<li key={i} className="card"><div style={{fontSize:12,color:"var(--color-fg-muted)",marginBottom:8}}>Step {i+1}</div><div style={{fontWeight:600,marginBottom:4}}>{s.title}</div><div style={{color:"var(--color-fg-muted)"}}>{s.body}</div></li>))}</ol>
  </Reveal></div></section>);
}

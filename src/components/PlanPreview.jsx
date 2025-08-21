import React, { useMemo } from "react";
import { SECTION_BUILDERS } from "../lib/planTokens";
import PlanCTA from "./PlanCTA";
import { exportHtmlLite } from "../lib/exporters"; // expected existing helper from Step 2

function copyText(txt) {
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(txt).catch(()=>{});
  } else {
    const ta = document.createElement("textarea");
    ta.value = txt; document.body.appendChild(ta);
    ta.select(); try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }
}

export default function PlanPreview({ answers }) {
  const sections = useMemo(()=>{
    const a = answers || {};
    return SECTION_BUILDERS.map(([name, builder])=>{
      let content;
      try { content = builder(a); } catch(e) { content = `[error rendering ${name}]`; }
      return { name, content };
    });
  }, [answers]);

  const fullText = sections.map(s => `## ${s.name}\n\n${s.content}`).join("\n\n---\n\n");

  const doExport = () => {
    if (typeof exportHtmlLite === "function") {
      exportHtmlLite({ title: "Business Plan Preview", markdown: fullText });
    } else {
      // Fallback: copy all if exporter missing
      copyText(fullText);
      alert("Exporter missing; full preview copied to clipboard.");
    }
  };

  return (
    <div className="plan-preview" style={{display:"grid", gridTemplateColumns:"2fr 1fr", gap:"16px"}}>
      <main>
        <h2>Plan Preview (Deterministic)</h2>
        <p style={{opacity:0.8}}>This preview is generated from your normalized answers. Missing fields are explicitly shown.</p>
        {sections.map((s, idx)=>(
          <section key={idx} style={{border:"1px solid #e5e7eb", padding:"12px", borderRadius:"8px", marginBottom:"12px"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <h3 style={{margin:0}}>{s.name}</h3>
              <button onClick={()=>copyText(s.content)} title="Copy section">Copy</button>
            </div>
            <pre style={{whiteSpace:"pre-wrap"}}>{s.content}</pre>
          </section>
        ))}
        <div>
          <button onClick={doExport} title="Export HTML">Export (HTML-lite)</button>
        </div>
      </main>
      <div>
        <PlanCTA answers={answers} />
      </div>
    </div>
  );
}
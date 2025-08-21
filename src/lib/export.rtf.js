/**
 * Step 14 â€” DOC export via RTF (no deps).
 */
export function buildRTFDoc(opts = {}) {
  const now = new Date().toISOString().slice(0,10);
  const title = opts.title || document.title || "Plan2Fund Plan";
  const getText = (sel) => {
    const el = document.querySelector(sel);
    return el ? el.textContent.trim() : "";
  };

  let programs = [];
  try {
    document.querySelectorAll("[data-program-name]").forEach(n => programs.push(n.textContent.trim()));
  } catch {}
  if (programs.length === 0) {
    try {
      document.querySelectorAll(".ProgramCard .text-base, .ProgramCard h3, .ProgramCard [data-title]")
        .forEach(n => {
          const t = n.textContent.trim();
          if (t && t.length < 140) programs.push(t);
        });
    } catch {}
  }
  programs = Array.from(new Set(programs)).slice(0, 20);

  const planSummary =
    opts.planSummary ||
    getText("[data-plan-summary]") ||
    "Auto-generated summary placeholder. Fill in company, market, product, traction, and funding usage.";

  function rtfEscape(s){ return String(s||"").replace(/[\\{}]/g, "\\$&").replace(/\n/g, "\\par "); }
  const header = "{\\rtf1\\ansi\\deff0";
  const body =
    "\\fs48\\b " + rtfEscape(title) + "\\b0\\fs24\\par " +
    "Date: " + rtfEscape(now) + "\\par\\par " +
    "\\b Selected Programs\\b0\\par " +
    (programs.length ? programs.map(p => "â€¢ " + rtfEscape(p) + "\\par ").join("") : "â€¢ (none)\\par ") +
    "\\par \\b Plan Summary\\b0\\par " + rtfEscape(planSummary) + "\\par ";
  const footer = "}";

  return header + body + footer;
}

export function downloadRTFBlob(content, filename="plan2fund_plan.doc") {
  const blob = new Blob([content], { type: "application/rtf" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
}

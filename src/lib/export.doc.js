/** Export a Word-compatible .doc (HTML) - no deps */
export function exportPlanDoc({title="Plan2Fund Plan", model={}, results=[], summary=""}={}){
  function esc(s){ return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  const today = new Date().toISOString().slice(0,10);
  const progList = results.slice(0,10).map(p=>`<li>${esc(p.name||p.program?.name||"Program")}</li>`).join("");
  const html = `
  <html><head><meta charset="utf-8"><title>${esc(title)}</title></head>
  <body style="font-family:Arial,Helvetica,sans-serif">
    <h1>${esc(title)}</h1>
    <p><b>Date:</b> ${today}</p>
    <h2>Executive Summary</h2>
    <p>${esc(summary||model.summary||"")}</p>
    <h2>Selected Programs</h2>
    <ul>${progList||"<li>(none)</li>"}</ul>
  </body></html>`;
  const blob = new Blob(['\ufeff'+html], {type: "application/msword"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = (title.replace(/[^\w\-]+/g,"_") || "plan2fund") + ".doc";
  document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },0);
}

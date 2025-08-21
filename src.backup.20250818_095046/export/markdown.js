export function generatePlanMarkdown(model, results){
  const lines=["# Plan2Fund Results","","## Input","```json",JSON.stringify(model,null,2),"```","","## Top Matches"];
  results.forEach((r,idx)=>{ lines.push(`### ${idx+1}. ${r.name}`); lines.push(`Score: ${(r.score*100).toFixed(1)}%`); if(r.explain?.length){ lines.push("- "+r.explain.join("\n- ")); } lines.push(""); });
  return lines.join("\n");
}
export function downloadPlanMarkdown(md){
  const blob=new Blob([md],{type:"text/markdown"}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="plan2fund_results.md"; a.click(); URL.revokeObjectURL(a.href);
}
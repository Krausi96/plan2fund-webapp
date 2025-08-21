export function planToMarkdown({ inputs = {}, results = [] } = {}) {
  const h = (s) => `## ${s}\n`;
  let md = `# Plan2Fund Export\\n\\n`;
  md += h("Inputs");
  md += `- Sector: ${inputs.sector || "-"}\\n- Idea: ${(inputs.idea||"").slice(0,200)}\\n- Cofund ratio: ${inputs.cofund_ratio ?? "-"}\\n\\n`;
  md += h("Top Matches");
  results.slice(0,5).forEach((r,i)=>{
    md += `**${i+1}. ${r.program.name}** — score ${r.score.toFixed(2)}\\n`;
    md += `- Deadline: ${r.program.deadline_iso || "N/A"}\\n- Cofunding: ${(r.program.cofund_ratio??0)*100}%\\n`;
    if (r.reasons?.length) md += `- Why: ${r.reasons.join(", ")}\\n`;
    md += `\\n`;
  });
  return md;
}

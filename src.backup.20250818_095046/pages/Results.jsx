import { generatePlanMarkdown, downloadPlanMarkdown } from "../export/markdown";
export default function Results({ model, results, onBack }){
  function exportJSON(){ const blob=new Blob([JSON.stringify({model,results},null,2)],{type:"application/json"}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="plan2fund_results.json"; a.click(); URL.revokeObjectURL(a.href); }
  async function exportMD(){ const md=generatePlanMarkdown(model,results); try{ const res=await fetch("/api/export-md",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({markdown:md})}); if(res.ok){ const text=await res.text(); downloadPlanMarkdown(text); return; } }catch(e){} downloadPlanMarkdown(md); }
  return (<div>
    <button onClick={onBack}>&larr; Back</button><h2>Top matches</h2>
    {results.length===0 ? <p>No eligible programmes found.</p> :
      <div style={{display:"grid",gap:12}}>
        {results.map((r,i)=>(<div key={r.id} style={{border:"1px solid #ddd",borderRadius:8,padding:12}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><strong>#{i+1} {r.name}</strong><span>Score: {(r.score*100).toFixed(1)}%</span></div>
          <ul>{r.explain.map((x,idx)=><li key={idx}>{x}</li>)}</ul>
        </div>))}
      </div>}
    <div style={{marginTop:16,display:"flex",gap:8}}>
      <button onClick={exportMD}>Export Markdown</button>
      <button onClick={exportJSON}>Export JSON</button>
      <button onClick={()=>window.print()}>Print</button>
    </div>
  </div>);
}
import ProgramCard from "../components/ProgramCard";
import { exportPlanDoc } from "../lib/export.doc";
export default function ResultsPage({ model, results, onBack }) {
  const canProceed = true; // strict gating off by default
  const summary = model && (model.summary || model.idea) || "";
  return (
    <div style={{maxWidth:900, margin:"0 auto"}}>
      <h2>Results</h2>
      {!canProceed && (<div style={{color:"#b91c1c"}}>Some mandatory conditions not met. Adjust answers.</div>)}
      <div style={{marginTop:8}}>
        {(results||[]).map((p,i)=>(
          <ProgramCard key={i} program={p} evaluation={p.evaluation} />
        ))}
      </div>
      <div style={{display:"flex",gap:8,marginTop:12}}>
        <button onClick={()=>exportPlanDoc({ title:"Plan2Fund Plan", model, results, summary })} style={{padding:"10px 14px",border:"1px solid #e5e7eb",borderRadius:10}}>Export .doc</button>
        <button onClick={onBack} style={{padding:"10px 14px",border:"1px solid #e5e7eb",borderRadius:10}}>Back to start</button>
      </div>
    </div>
  );
}

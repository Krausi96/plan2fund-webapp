import { useState } from "react";
export default function PlanPage({ onPreview }) {
  const [plan, setPlan] = useState({ summary:"", company:"", market:"", product:"", traction:"", usage:"" });
  function submit(){ onPreview && onPreview(plan); }
  return (
    <div style={{maxWidth:900, margin:"0 auto"}}>
      <h2>Business Plan Generator</h2>
      {["summary","company","market","product","traction","usage"].map(k=>(
        <div key={k} style={{margin:"8px 0"}}>
          <div style={{fontSize:12,opacity:0.7}}>{k}</div>
          <textarea value={plan[k]} onChange={e=>setPlan({...plan,[k]:e.target.value})} style={{width:"100%",minHeight:80,padding:10,borderRadius:8}}/>
        </div>
      ))}
      <button onClick={submit} style={{padding:"12px 18px",border:"1px solid #e5e7eb",borderRadius:10,fontWeight:800}}>Preview</button>
    </div>
  );
}

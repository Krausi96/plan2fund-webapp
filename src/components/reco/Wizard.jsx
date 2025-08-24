
import { useState, useEffect } from 'react';
export default function Wizard({steps=3,onFinish}){
  const [i,setI] = useState(0);
  const [data,setData] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('p2f.wizard')||'{}'); }catch{ return {} }
  });
  useEffect(()=>{ localStorage.setItem('p2f.wizard', JSON.stringify(data)); },[data]);
  const next = ()=> setI(x=> Math.min(steps-1, x+1));
  const back = ()=> setI(x=> Math.max(0, x-1));
  const done = ()=> onFinish?.(data);
  return (
    <div className="card">
      <div className="badge">Step {i+1} / {steps}</div>
      <div style={{margin:'12px 0'}}>
        <input placeholder="Industry (e.g., AI)" style={{width:'100%',padding:'10px',borderRadius:'10px',border:'1px solid rgba(255,255,255,.12)'}}
          value={data.industry||''} onChange={e=>setData({...data,industry:e.target.value})}/>
      </div>
      <div style={{display:'flex',gap:8}}>
        <button className="btn" onClick={back} disabled={i===0}>Back</button>
        {i<steps-1 ? <button className="btn primary" onClick={next}>Next</button> : <button className="btn primary" onClick={done}>Show Programs</button>}
      </div>
    </div>
  )
}

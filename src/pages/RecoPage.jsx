import { useMemo, useState } from "react";
import corpus from "../data/corpus.programs.json";
import { evaluateEligibility } from "../lib/eligibility.engine";
import ProgramCard from "../components/ProgramCard";

export default function RecoPage({ onResults }) {
  const [form, setForm] = useState({ sector:"AI", idea:"", cofund:0.3 });
  const [err, setErr] = useState("");

  function scoreProgram(p, f){
    let score = 0;
    if (Array.isArray(p.sectors) && f.sector && p.sectors.map(s=>String(s).toLowerCase()).includes(String(f.sector).toLowerCase())) score += 30;
    if (typeof p.cofundMin==="number") {
      const diff = Math.max(0, (Number(f.cofund||0) - Number(p.cofundMin)));
      score += Math.min(30, Math.round(diff*100)); // up to +30
    }
    if (Array.isArray(p.keywords) && f.idea) {
      const idea = String(f.idea).toLowerCase();
      const hits = p.keywords.reduce((acc,k)=> acc + (idea.indexOf(String(k).toLowerCase())>=0 ? 1:0), 0);
      score += Math.min(40, hits*10);
    }
    return score;
  }

  const ranked = useMemo(()=>{
    const list = (Array.isArray(corpus)?corpus:[]).map(p=>{
      const evaluation = evaluateEligibility(p, form);
      return { program:p, score: scoreProgram(p, form), evaluation };
    });
    return list.sort((a,b)=>b.score-a.score).slice(0,5);
  }, [form]);

  function submit(){
    if (!form.sector || String(form.cofund)==="") { setErr("Please fill sector and cofund."); return; }
    const results = ranked.map(r=>({ ...r.program, evaluation: r.evaluation }));
    onResults && onResults({ model: form, results });
  }

  return (
    <div style={{maxWidth:900, margin:"0 auto"}}>
      <h2>Recommendation Engine</h2>
      {err && <div style={{color:"#b91c1c"}}>{err}</div>}
      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:12, marginTop:12}}>
        <div>
          <div>Sector</div>
          <select value={form.sector} onChange={e=>setForm({...form, sector:e.target.value})} style={{padding:10,borderRadius:8,width:"100%"}}>
            <option>AI</option><option>SaaS</option><option>DeepTech</option><option>Services</option>
          </select>
        </div>
        <div>
          <div>Idea summary</div>
          <textarea value={form.idea} onChange={e=>setForm({...form, idea:e.target.value})} placeholder="Describe your idea (keywords help ranking)" style={{padding:10,borderRadius:8,width:"100%",minHeight:90}} />
        </div>
        <div>
          <div>Cofunding ratio (0..1)</div>
          <input type="number" min="0" max="1" step="0.05" value={form.cofund} onChange={e=>setForm({...form, cofund:Number(e.target.value)})} style={{padding:10,borderRadius:8,width:"100%"}}/>
        </div>
        <button onClick={submit} style={{padding:"12px 18px",border:"1px solid #e5e7eb",borderRadius:10,fontWeight:800}}>See Matches</button>
      </div>

      <div style={{marginTop:18}}>
        {ranked.map((r,i)=>(
          <ProgramCard key={i} program={r.program} evaluation={r.evaluation} />
        ))}
      </div>
    </div>
  );
}

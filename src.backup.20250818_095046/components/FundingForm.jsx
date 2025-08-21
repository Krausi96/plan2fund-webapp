import { useMemo, useState } from "react";
import match from "../engine/match";
const SECTORS=["Digital/AI/Data/Space","Health/BioTech","Climate/Energy/Mobility","Food/Bioeconomy/Agri/Environment","Security/Civil Protection","Culture/Creative/Media","Manufacturing/Industry 4.0","Fintech/Industry 4.0"];
export default function FundingForm({ onSubmit }){
  const [model,setModel]=useState({jurisdiction:"EU",country:"AT",stage:"mvp",trl:"",sector:"Digital/AI/Data/Space",request_eur:"",cofin_percent:"",femaleFounder:false,universityCollab:false,sustainability:false,ipReady:false});
  const valid=useMemo(()=>["jurisdiction","stage","sector","request_eur","cofin_percent"].every(k=>model[k]!==""&&model[k]!==null&&model[k]!==undefined),[model]);
  function handleChange(e){ const {name,type,value,checked}=e.target; setModel(m=>({...m,[name]:type==="checkbox"?checked:value})); }
  function submit(e){ e.preventDefault(); const clean={...model}; if(clean.trl==="") delete clean.trl; clean.request_eur=Number(clean.request_eur); clean.cofin_percent=Number(clean.cofin_percent); const results=match(clean).slice(0,3); onSubmit({model:clean,results}); }
  return (<form onSubmit={submit} style={{display:"grid",gap:12}}>
    <label>Jurisdiction <select name="jurisdiction" value={model.jurisdiction} onChange={handleChange}><option value="EU">EU</option><option value="AT">Austria (national + EU)</option></select></label>
    <label>Stage <select name="stage" value={model.stage} onChange={handleChange}><option value="idea">Idea</option><option value="mvp">MVP</option><option value="traction">Traction</option><option value="scale">Scale</option></select></label>
    <label>TRL (optional 1–9) <input name="trl" type="number" min="1" max="9" value={model.trl} onChange={handleChange}/></label>
    <label>Sector <select name="sector" value={model.sector} onChange={handleChange}>{SECTORS.map(s=><option key={s} value={s}>{s}</option>)}</select></label>
    <label>Requested amount (€) <input name="request_eur" type="number" min="0" step="1000" value={model.request_eur} onChange={handleChange} required/></label>
    <label>Co-financing (% as 0–1) <input name="cofin_percent" type="number" min="0" max="1" step="0.05" value={model.cofin_percent} onChange={handleChange} required/></label>
    <fieldset><legend>Extras (boosters)</legend>
      <label><input type="checkbox" name="femaleFounder" checked={model.femaleFounder} onChange={handleChange}/> Female founder</label>
      <label><input type="checkbox" name="universityCollab" checked={model.universityCollab} onChange={handleChange}/> University collab</label>
      <label><input type="checkbox" name="sustainability" checked={model.sustainability} onChange={handleChange}/> Sustainability impact</label>
      <label><input type="checkbox" name="ipReady" checked={model.ipReady} onChange={handleChange}/> IP ready</label>
    </fieldset>
    <button type="submit" disabled={!valid}>Find Funding</button>
    {!valid && <small>Fill required fields to continue.</small>}
  </form>);
}
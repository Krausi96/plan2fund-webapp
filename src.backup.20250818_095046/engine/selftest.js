import programs from "./programs.json";
import { rank } from "./rank";
function okCase(){ const model={jurisdiction:"EU", country:"AT", stage:"mvp", trl:5, sector:"Digital/AI/Data/Space", request_eur:300000, cofin_percent:0.3, femaleFounder:true, sustainability:true}; const r=rank(model,programs); return r.length>0 && r[0].score>=0.5; }
function rejectCase(){ const model={jurisdiction:"EU", stage:"idea", trl:2, sector:"Digital/AI/Data/Space", request_eur:5000, cofin_percent:0}; const r=rank(model,programs); return r.length===0; }
export function runSelfTests(){ return { ok: okCase() && rejectCase() }; }
if(typeof window!=="undefined"){ window.Plan2Fund=window.Plan2Fund||{}; window.Plan2Fund.runSelfTests=runSelfTests; }
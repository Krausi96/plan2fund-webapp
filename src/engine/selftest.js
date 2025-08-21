import { rank as rankCore } from "./rankCore.js";
export function runSelfTests(){
  try{
    const demo = [
      { id:"demo", name:"Demo EU", scope:"EU", sectors:["AI"], cofund_ratio:0.3, deadline_iso:"2099-12-31" }
    ];
    const r = rankCore(demo, { sector:"AI", idea:"AI SaaS for SMEs", cofund_ratio:0.5 });
    return { ok: Array.isArray(r) && r.length>0 };
  }catch(e){ return { ok:false, error:String(e) }; }
}
if (typeof window !== "undefined") {
  window.Plan2Fund = window.Plan2Fund || {};
  window.Plan2Fund.runSelfTests = runSelfTests;
}
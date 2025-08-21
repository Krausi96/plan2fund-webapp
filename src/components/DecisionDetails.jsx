import { computeConfidence } from "../lib/confidence.score";
export default function DecisionDetails({ program, evaluation }) {
  const { band, score, supportingRules, anchors } = computeConfidence(program, evaluation||{});
  return (
    <div style={{border:"1px solid #e5e7eb",borderRadius:12,padding:12,background:"#fff"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontWeight:700}}>Decision details</div>
        <span title={`Confidence ${band} (${score}%)`} style={{fontSize:12,padding:"2px 8px",border:"1px solid #e5e7eb",borderRadius:999}}>
          Confidence {band}
        </span>
      </div>
      {supportingRules && supportingRules.length>0 && (
        <ul style={{marginTop:8, paddingLeft:18}}>
          {supportingRules.map((r,i)=>(<li key={i}>{r.description} {r.anchor && (<a href={r.anchor} target="_blank" rel="noreferrer">official</a>)}</li>))}
        </ul>
      )}
      {anchors && anchors.length>0 && (
        <div style={{marginTop:8,fontSize:12,display:"flex",flexWrap:"wrap",gap:6}}>
          {anchors.map((u,i)=>(<a key={i} href={u} target="_blank" rel="noreferrer" style={{border:"1px solid #e5e7eb",borderRadius:8,padding:"2px 6px"}}>{u}</a>))}
        </div>
      )}
    </div>
  );
}


export default function EligibilityBadge({percent=0}){
  const color = percent>=80?'var(--success)': percent>=50?'var(--warning)':'var(--danger)';
  return <span className="badge" style={{border:'1px solid rgba(255,255,255,.12)'}} aria-label={`Completeness ${percent}%`}>
    <span style={{width:8,height:8,borderRadius:99,background:color,display:'inline-block'}}/>
    {percent}% complete
  </span>
}

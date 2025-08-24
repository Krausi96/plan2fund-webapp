
const chapters = ['Summary','Team','Problem','Solution','Market','GTM','Ops','Risks','Milestones','Financials','Attachments'];
export default function ChapterNav({active=0,onSelect}){
  return (
    <div className="card" style={{display:'flex',flexWrap:'wrap',gap:8}}>
      {chapters.map((c,idx)=>(
        <button key={c} className="btn" onClick={()=>onSelect?.(idx)} aria-current={idx===active?'page':undefined}>{c}</button>
      ))}
    </div>
  )
}

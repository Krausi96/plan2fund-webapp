
export default function ProgramCards({items=[]}){
  return (
    <div className="grid grid-cols-3">
      {items.map((p)=>(
        <div className="card" key={p.id}>
          <div className="badge">Score {p.score}%</div>
          <h3 style={{margin:'8px 0 4px'}}>{p.name}</h3>
          <p style={{color:'var(--muted)'}}>{p.reason}</p>
          <div style={{marginTop:12,display:'flex',gap:8}}>
            <button className="btn">Details</button>
            <button className="btn primary" onClick={()=>alert('Added to plan')}>Add</button>
          </div>
        </div>
      ))}
    </div>
  )
}

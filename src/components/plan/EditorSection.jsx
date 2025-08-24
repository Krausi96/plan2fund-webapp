
export default function EditorSection({title,value,onChange}){
  return (
    <div className="card">
      <div className="section-title">{title}</div>
      <textarea value={value} onChange={e=>onChange?.(e.target.value)} rows={8} style={{width:'100%',background:'var(--bg-soft)',color:'var(--text)',border:'1px solid rgba(255,255,255,.12)',borderRadius:'12px',padding:'12px'}} />
    </div>
  )
}

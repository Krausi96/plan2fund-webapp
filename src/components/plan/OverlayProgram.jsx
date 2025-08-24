
export default function OverlayProgram({open, onClose}){
  if(!open) return null;
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)'}} onClick={onClose}>
      <div className="card fly-in" style={{position:'absolute',right:20,top:20,width:360}} onClick={e=>e.stopPropagation()}>
        <div className="section-title">Program Requirements</div>
        <ul style={{color:'var(--muted)'}}>
          <li>Incorporated in EU</li>
          <li>Sector: Digital/AI</li>
          <li>Headcount &lt; 50</li>
        </ul>
      </div>
    </div>
  )
}

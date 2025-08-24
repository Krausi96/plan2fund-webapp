import React from "react";
export default function PreviewModal({open,onClose,children}){
  if(!open) return null;
  return (
    <div role="dialog" aria-modal="true" style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"grid",placeItems:"center",zIndex:60}}>
      <div className="pf-card" style={{width:"min(900px,92vw)",maxHeight:"80vh",overflow:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10, position:"sticky", top:0, background:"rgba(12,12,16,.85)", backdropFilter:"blur(8px)", padding:"8px 4px"}}>
          <strong>Preview</strong>
          <button className="pf-btn" onClick={onClose}>Close</button>
        </div>
        <div style={{paddingTop:8}}>{children}</div>
      </div>
    </div>
  );
}

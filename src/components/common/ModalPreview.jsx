
import { useEffect } from 'react';
export default function ModalPreview({open,onClose,children}){
  useEffect(()=>{
    function onKey(e){ if(e.key==='Escape'){ onClose?.()} }
    if(open){ window.addEventListener('keydown',onKey); }
    return ()=>window.removeEventListener('keydown',onKey);
  },[open,onClose]);
  if(!open) return null;
  return (
    <div role="dialog" aria-modal="true" style={{position:'fixed',inset:0,display:'grid',placeItems:'center',background:'rgba(0,0,0,.5)',zIndex:50}} onClick={onClose}>
      <div className="card fly-in" style={{width:'min(920px,92vw)',maxHeight:'82vh',overflow:'auto'}} onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

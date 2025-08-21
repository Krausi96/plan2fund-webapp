import React,{useEffect,useRef,useState} from "react";
export default function Reveal({children}){ const ref=useRef(null); const [v,setV]=useState(false);
  useEffect(()=>{ const el=ref.current; if(!el) return; const io=new IntersectionObserver(([e])=>{ if(e.isIntersecting){ setV(true); io.disconnect() } },{threshold:.12}); io.observe(el); return ()=>io.disconnect() },[]);
  return <div ref={ref} className="reveal" data-inview={v}>{children}</div>;
}

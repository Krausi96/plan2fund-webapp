
import React,{useEffect,useRef} from "react";
export default function Reveal({children,delay=0}){
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const show=()=>{ el.style.animationDelay=`${delay}ms`; el.classList.add("reveal"); };
    if("IntersectionObserver" in window){
      const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){show();io.disconnect();}})},{threshold:.12});
      io.observe(el); return ()=>io.disconnect();
    }
    show();
  },[delay]);
  return <div ref={ref}>{children}</div>;
}

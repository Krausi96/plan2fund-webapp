import React, {useMemo} from "react";
export default function Hero(){
  const emojis = useMemo(()=>Array.from({length:24}).map((_,i)=>({
    left: Math.random()*100,
    delay: Math.random()*6,
    dur: 6 + Math.random()*7,
    char: Math.random()>0.5 ? "??" : "??"
  })),[]);
  return (
    <section className="pf-hero">
      <div className="pf-emoji" aria-hidden="true">
        {emojis.map((e,i)=>(<i key={i} style={{left:e.left+"%", animationDuration:e.dur+"s", animationDelay:e.delay+"s"}}>{e.char}</i>))}
      </div>
      <div className="pf-hero-wrap">
        <h1>Freedom starts with a clear plan ? let?s build yours</h1>
        <p>Find the right grants in Austria/EU and generate a sharp, investor-ready business plan. Clean UI, no spam, no trackers.</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <a className="pf-btn primary" href="/reco">Find Funding</a>
          <a className="pf-btn" href="/plan">Generate Plan</a>
        </div>
        <div style={{marginTop:26,opacity:.85,fontSize:13}}>
          <span>GDPR ? Terms ? Contact ? Pricing ? Examples</span>
        </div>
      </div>
    </section>
  );
}

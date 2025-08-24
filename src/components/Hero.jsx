import React, {useMemo} from "react";
import TrustBar from "./TrustBar";
export default function Hero(){
  const emojis = useMemo(()=>Array.from({length:18}).map((_,i)=>({
    left: Math.random()*100, delay: Math.random()*6, dur: 7 + Math.random()*6,
    char: Math.random()>0.5 ? '\uD83D\uDCB6' : '\uD83D\uDCC8'
  })),[]);
  return (
    <>
      <section className="pf-hero">
        <div className="pf-emoji" aria-hidden="true">
          {emojis.map((e,i)=>(<i key={i} style={{left:e.left+"%", animationDuration:e.dur+"s", animationDelay:e.delay+"s"}}>{e.char}</i>))}
        </div>
        <div className="pf-hero-wrap">
          <h1>Freedom starts with a clear plan {'\u2014'} let&apos;s build yours</h1>
          <p>Find the right grants in Austria/EU and generate a sharp, investor-ready business plan. Clean UI, no spam, no trackers.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <a className="pf-btn primary" href="/reco">Find Funding</a>
            <a className="pf-btn" href="/plan">Generate Plan</a>
          </div>
          <div style={{marginTop:26,opacity:.85,fontSize:13}}>
            <span>GDPR {'\u2022'} Terms {'\u2022'} Contact {'\u2022'} Pricing {'\u2022'} Examples</span>
          </div>
        </div>
      </section>
      <TrustBar/>
    </>
  );
}

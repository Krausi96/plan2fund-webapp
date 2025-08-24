import React from "react";
export default function PriceTiers(){
  const tiers = [
    {id:"custom", name:"Custom Plan", price:"?0?49", features:["Outline","Key sections","Basic export"]},
    {id:"upgrade", name:"Upgrade & Review", price:"?149", features:["Editor support","Reviewer notes","Eligibility map"]},
    {id:"strategy", name:"Strategy & Modelling", price:"?299", features:["Financial model stub","Timeline & KPIs","Pitch brief"]}
  ];
  return (
    <div id="pricing" className="pf-section">
      <div className="pf-wrap">
        <h2 style={{marginTop:0}}>Pricing</h2>
        <div className="pf-grid">
          {tiers.map(t=>(
            <div className="pf-card" key={t.id}>
              <h3 style={{marginTop:0}}>{t.name}</h3>
              <div style={{fontSize:24,marginBottom:8}}>{t.price}</div>
              <ul style={{marginTop:6,paddingLeft:18}}>
                {t.features.map((f,i)=><li key={i}>{f}</li>)}
              </ul>
              <div style={{marginTop:12}}><button className="pf-btn" disabled>Select (Preview)</button></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

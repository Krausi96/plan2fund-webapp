
import React from "react";

export default function PricingTable() {
  const tiers = [
    { name: "Basic submission", price: "€500–€850", features: ["Short, form‑based apps"] },
    { name: "Custom plan", price: "€1.300–€2.500", features: ["Full plan, institutions & banks"] },
    { name: "Upgrade & review", price: "€800–€1.300", features: ["Fix structure & formatting"] },
    { name: "Strategy & modelling", price: "€1.000–€2.000", features: ["Early‑stage ideas"] }
  ];
  return (
    <section className="section">
      <div className="container">
        <h2 style={{marginTop:0}}>Pricing</h2>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16}}>
          {tiers.map((t, i) => (
            <div key={i} className="card">
              <div style={{fontWeight:700, marginBottom:6}}>{t.name}</div>
              <div style={{fontSize:20, marginBottom:10}}>{t.price}</div>
              <ul style={{paddingLeft:18, margin:0}}>
                {t.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

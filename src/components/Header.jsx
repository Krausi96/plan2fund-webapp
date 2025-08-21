
import React from "react";
import LangSwitch from "./LangSwitch.jsx";

export default function Header() {
  return (
    <header style={{position:"sticky", top:0, zIndex:10, background:"rgba(17,18,26,0.6)", backdropFilter:"blur(8px)", borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
      <div className="container" style={{display:"flex", alignItems:"center", justifyContent:"space-between", height:64}}>
        <a href="/" style={{fontWeight:700}}>Plan2Fund</a>
        <nav style={{display:"flex", gap:16, alignItems:"center"}}>
          <a href="/reco">Find funding</a>
          <a href="/plan">Plan</a>
          <a href="/pricing">Pricing</a>
          <LangSwitch />
        </nav>
      </div>
    </header>
  );
}

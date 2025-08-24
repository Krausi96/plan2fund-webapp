import React from "react";
export default function Header(){
  return (
    <header className="pf-header">
      <div className="pf-header-inner">
        <a href="/" aria-label="Plan2Fund Home" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",color:"#fff"}}>
          <div style={{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#6366f1,#0ea5e9)"}}/>
          <strong>Plan2Fund</strong>
        </a>
        <nav className="pf-nav">
          <a href="/#pricing">Pricing</a>
          <a href="/#examples">Examples</a>
          <a href="/#contact">Contact</a>
          <a href="/legal">GDPR</a>
        </nav>
      </div>
    </header>
  );
}

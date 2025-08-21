
import React from "react";
import { createRoot } from "react-dom/client";
function CrumbBar(){
  const path = typeof window!=="undefined" ? window.location.pathname : "/";
  if (path === "/") return null;
  const parts = path.split("/").filter(Boolean);
  const map = {"reco":"Find funding","results":"Results","plan":"Plan","checkout":"Checkout","export":"Export"};
  const href = (i)=>"/"+parts.slice(0,i+1).join("/");
  return (
    <nav style={{position:"sticky",top:64,zIndex:19,background:"rgba(12,14,20,.5)",backdropFilter:"blur(8px)",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
      <div className="container" style={{height:44,display:"flex",alignItems:"center",gap:8,overflowX:"auto"}}>
        <a href="/" style={{opacity:.8}}>Home</a>
        {parts.map((p,i)=>(<span key={i} style={{display:"inline-flex",alignItems:"center",gap:8}}><span style={{opacity:.4}}>/</span><a href={href(i)}>{map[p]||p}</a></span>))}
      </div>
    </nav>
  );
}
if (typeof window!=="undefined") {
  const mount = document.createElement("div");
  document.body.prepend(mount);
  createRoot(mount).render(<CrumbBar/>);
}

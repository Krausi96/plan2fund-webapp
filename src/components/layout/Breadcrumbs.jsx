import React from "react";
import { Link, useLocation } from "react-router-dom";
const LABELS = { "reco":"Find Funding", "plan":"Business Plan", "results":"Results", "pricing":"Pricing", "legal":"Legal" };
export default function Breadcrumbs(){
  const { pathname } = useLocation();
  if(pathname==="/") return null;
  const parts = pathname.replace(/^\/+/,"").split("/").filter(Boolean);
  const crumbs = [["/","Home"]].concat(parts.map((p,i)=>["/"+parts.slice(0,i+1).join("/"), LABELS[p]||p]));
  return (
    <nav aria-label="Breadcrumb" className="container" style={{padding:"10px 0"}}>
      {crumbs.map(([href,label],i)=>(
        <span key={href}>
          {i>0 && <span style={{opacity:.6}}> â€º </span>}
          {i<crumbs.length-1 ? <Link to={href}>{label}</Link> : <span aria-current="page" style={{opacity:.8}}>{label}</span>}
        </span>
      ))}
    </nav>
  );
}

import React from "react";
export default function Breadcrumbs({trail=[]}){
  return (
    <nav aria-label="Breadcrumb" className="pf-crumbs">
      {trail.map((t,i)=>(
        <span key={i}>
          {i>0 && <span className="pf-crumb-sep">{'\u203A'}</span>}
          {t.href ? <a href={t.href}>{t.label}</a> : <strong>{t.label}</strong>}
        </span>
      ))}
    </nav>
  );
}

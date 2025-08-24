import React from "react";
export default function Header(){
  const links = [
    {label:"Pricing", href:"/preview"},
    {label:"Examples", href:"/#examples"},
    {label:"Contact", href:"/#contact"},
    {label:"GDPR", href:"/legal"}
  ];
  return (
    <header className="pf-header">
      <div className="pf-header-inner">
        <a href="/" className="pf-brand" aria-label="Plan2Fund Home">
          <div className="pf-brand-logo"></div><strong>Plan2Fund</strong>
        </a>
        <nav className="pf-nav">
          {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
      </div>
    </header>
  );
}

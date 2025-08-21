import React from "react"; import { useI18n } from "../lib/i18n";
export default function Header({breadcrumbs=[]}){
  const { t } = useI18n();
  return (<header data-component="Header" style={{position:"sticky",top:0,backdropFilter:"saturate(180%) blur(8px)",background:"rgba(255,255,255,.7)",borderBottom:"1px solid var(--color-border)",zIndex:20}}>
    <div className="container" style={{display:"flex",alignItems:"center",gap:16,minHeight:64}}>
      <a href="/" style={{fontWeight:700,textDecoration:"none",color:"inherit"}}>Plan2Fund</a>
      <nav style={{marginLeft:"auto",display:"flex",gap:16}}>
        <a href="/pricing" style={{textDecoration:"none",color:"inherit"}}>{t("nav.pricing","Pricing")}</a>
        <a href="/examples" style={{textDecoration:"none",color:"inherit"}}>{t("nav.examples","Examples")}</a>
      </nav>
    </div>
    {!!breadcrumbs.length && <div className="container" style={{fontSize:14,color:"var(--color-fg-muted)",padding:"8px 0"}}>
      {breadcrumbs.map((b,i)=>(<span key={i}>{i?" / ":""}<a href={b.href} style={{textDecoration:"none",color:"inherit"}}>{b.label}</a></span>))}
    </div>}
  </header>);
}

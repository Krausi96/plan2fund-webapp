import React from "react"; import { useI18n } from "../lib/i18n";
export default function CTABand(){ const { t } = useI18n(); return (<section className="section" style={{paddingTop:32,paddingBottom:48}}>
  <div className="container card" style={{display:"flex",gap:16,alignItems:"center",justifyContent:"space-between"}}>
    <div><div style={{fontWeight:700,fontSize:"var(--fs-xl)"}}>Ready?</div><div style={{color:"var(--color-fg-muted)"}}>Pick a path to start in under 60 seconds.</div></div>
    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}><a className="button" href="/reco">{t("landing.ctaPrimary","Find Funding")}</a><a className="button secondary" href="/plan">{t("landing.ctaSecondary","Generate Plan")}</a></div>
  </div>
</section>); }

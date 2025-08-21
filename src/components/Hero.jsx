import React from "react"; import Orbs from "./Orbs"; import Reveal from "./Reveal"; import LangSwitch from "./LangSwitch"; import { useI18n } from "../lib/i18n";
export default function Hero(){ const { t } = useI18n(); return (<section className="section" style={{position:"relative",paddingTop:64,paddingBottom:48,overflow:"hidden"}}>
  <Orbs/><div className="container"><Reveal>
    <h1 style={{fontSize:"var(--fs-4xl)",lineHeight:"var(--lh-tight)",margin:"0 0 12px"}}>{t("brand.tagline","Freedom starts with a clear plan - let's build yours.")}</h1>
    <p style={{maxWidth:"72ch",color:"var(--color-fg-muted)",fontSize:"var(--fs-md)"}}>{t("landing.block2")}</p>
    <p style={{maxWidth:"72ch",color:"var(--color-fg-muted)",fontSize:"var(--fs-md)"}}>{t("landing.block2b")}</p>
    <div style={{marginTop:24}}><LangSwitch/></div>
  </Reveal></div>
</section>); }

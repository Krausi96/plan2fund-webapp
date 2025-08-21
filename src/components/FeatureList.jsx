import React from "react"; import Reveal from "./Reveal"; import { useI18n } from "../lib/i18n";
export default function FeatureList(){ const { t } = useI18n(); const list=t("landing.included",[])||[];
  return (<section className="section"><div className="container"><Reveal>
    <h2 style={{fontSize:"var(--fs-2xl)",margin:"0 0 12px"}}>{t("landing.includedTitle","What is included")}</h2>
    <ul style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:12,padding:0,margin:0,listStyle:"none"}}>{list.map((x,i)=>(<li key={i} className="card" style={{display:"flex",alignItems:"center",gap:12}}><span>âœ”</span><span>{x}</span></li>))}</ul>
  </Reveal></div></section>);
}

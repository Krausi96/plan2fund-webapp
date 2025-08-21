
import React from "react";
import Reveal from "./Reveal.jsx";
import { useI18n } from "../lib/i18n.js";

export default function FeatureList() {
  const { t } = useI18n();
  const items = t("product.useCases_items", []);
  return (
    <section className="section">
      <div className="container">
        <h2 className="reveal" style={{marginTop:0}}>{t("product.useCases_title")}</h2>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16}}>
          {items.map((it, idx) => (
            <Reveal key={idx} delay={idx*40}><div className="card" style={{padding:"16px 18px"}}>{it}</div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

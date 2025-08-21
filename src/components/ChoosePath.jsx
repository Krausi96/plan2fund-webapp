
import React from "react";
import { useI18n } from "../lib/i18n.js";
export default function ChoosePath(){
  const { t } = useI18n();
  const cards = t("choose.cards", []);
  return (
    <section className="section">
      <div className="container">
        <h2 style={{marginTop:0}}>{t("choose.title")}</h2>
        <div className="grid">
          {cards.map((c,i)=>(
            <div key={i} className="card">
              <div style={{fontWeight:700,marginBottom:6}}>{c.title}</div>
              <div style={{opacity:.9,marginBottom:12}}>{c.desc}</div>
              <a className="btn" href={c.href}>{c.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

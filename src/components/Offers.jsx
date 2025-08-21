
import React from "react";
import { useI18n } from "../lib/i18n.js";
export default function Offers(){
  const { t } = useI18n();
  const items = t("offers.items", []);
  return (
    <section className="section">
      <div className="container">
        <h2 style={{marginTop:0}}>{t("offers.title")}</h2>
        <div className="grid">
          {items.map((it,i)=>(
            <div key={i} className="card">
              <div style={{fontWeight:700,marginBottom:6}}>{it.title}</div>
              <div style={{opacity:.9}}>{it.desc}</div>
              <div style={{opacity:.75,fontSize:13,marginTop:8}}>{it.ideal}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

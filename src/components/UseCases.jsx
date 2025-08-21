
import React from "react";
import { useI18n } from "../lib/i18n.js";
export default function UseCases(){
  const { t } = useI18n();
  const items = t("usecases.items", []);
  return (
    <section className="section">
      <div className="container">
        <h2 style={{marginTop:0}}>{t("usecases.title")}</h2>
        <div className="grid">{items.map((it,i)=>(<div key={i} className="card">{it}</div>))}</div>
      </div>
    </section>
  );
}

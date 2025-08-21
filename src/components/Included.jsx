
import React from "react";
import { useI18n } from "../lib/i18n.js";
export default function Included(){
  const { t } = useI18n();
  const items = t("included.items", []);
  return (
    <section className="section">
      <div className="container card">
        <h2 style={{marginTop:0}}>{t("included.title")}</h2>
        <ul style={{margin:0,paddingLeft:18,columns:(items.length>4?2:1)}}>
          {items.map((it,i)=>(<li key={i} style={{marginBottom:10}}>{it}</li>))}
        </ul>
      </div>
    </section>
  );
}


import React from "react";
import { useI18n } from "../lib/i18n.js";

export default function CTABand({ onPrimary }) {
  const { t } = useI18n();
  return (
    <section className="section" style={{padding:"32px 0 48px"}}>
      <div className="container card" style={{textAlign:"center"}}>
        <h3 style={{marginTop:0, marginBottom:8}}>{t("cta_band.title")}</h3>
        <button className="btn" onClick={onPrimary}>{t("cta_band.cta")}</button>
      </div>
    </section>
  );
}


import React from "react";
import Orbs from "./Orbs.jsx";
import Reveal from "./Reveal.jsx";
import { useI18n } from "../lib/i18n.js";

export default function Hero(){
  const { t } = useI18n();
  return (
    <section className="section" style={{position:"relative",padding:"84px 0 24px"}}>
      <Orbs/>
      <div className="container">
        <span className="badge reveal">{t("hero.eyebrow")}</span>
        <h1 className="hero-title reveal">{t("hero.title")}</h1>
        <p className="hero-sub reveal">{t("value.line1")}</p>
        <p className="hero-note reveal">{t("value.line2")}</p>
      </div>
    </section>
  );
}

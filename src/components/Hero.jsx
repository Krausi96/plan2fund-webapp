
import React from "react";
import "../../design/theme.css";
import "../../design/motion.css";
import Orbs from "./Orbs.jsx";
import Reveal from "./Reveal.jsx";
import { useI18n } from "../lib/i18n.js";

export default function Hero({ onFindFunding, onCreatePlan }) {
  const { t } = useI18n();
  return (
    <section className="section" style={{position:"relative", padding:"72px 0 40px"}}>
      <div className="orbs" aria-hidden="true">
        <div className="orb" style={{left:"-6%", top:"-4%"}}/>
        <div className="orb"/>
        <div className="orb"/>
      </div>
      <div className="container">
        <span className="badge reveal">{t("hero.eyebrow")}</span>
        <h1 className="reveal" style={{fontSize:"clamp(28px,5vw,48px)", lineHeight:1.18, margin:"16px 0 14px"}}>
          {t("hero.title")}
        </h1>
        <p className="reveal" style={{opacity:.8, maxWidth:780, margin:"0 0 20px"}}>
          {/* Keep copy short; longer copy moves to ProductGrid */}
        </p>
        <div className="reveal" style={{display:"flex", gap:12, flexWrap:"wrap"}}>
          <button className="btn" onClick={onFindFunding}>{t("hero.cta_find")}</button>
          <button className="btn secondary" onClick={onCreatePlan}>{t("hero.cta_plan")}</button>
        </div>
      </div>
    </section>
  );
}

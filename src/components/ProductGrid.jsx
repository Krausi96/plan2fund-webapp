
import React from "react";
import Reveal from "./Reveal.jsx";
import { useI18n } from "../lib/i18n.js";

function Card({ title, children }) {
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>{title}</h3>
      <div style={{opacity:.9}}>{children}</div>
    </div>
  );
}

export default function ProductGrid() {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className="container" style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"20px"}}>
        <Reveal><Card title={t("product.offer_custom")}>
          <p>Full plan from your business model — aligned with institutional & funding requirements.</p>
        </Card></Reveal>
        <Reveal delay={60}><Card title={t("product.offer_review")}>
          <p>We revise and upgrade your draft to pass (AWS, FFG, banks, visa).</p>
        </Card></Reveal>
        <Reveal delay={120}><Card title={t("product.offer_strategy")}>
          <p>Shape your model & strategy — ideal for early‑stage ideas and pivots.</p>
        </Card></Reveal>
      </div>
    </section>
  );
}

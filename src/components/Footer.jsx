
import React from "react";
import { useI18n } from "../lib/i18n.js";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer style={{padding:"48px 0 56px", borderTop:"1px solid rgba(255,255,255,0.06)"}}>
      <div className="container" style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:16}}>
        <div>
          <div style={{fontWeight:700, marginBottom:6}}>Plan2Fund</div>
          <div style={{opacity:.7}}>Beautiful plans for funding, visas, and banks.</div>
        </div>
        <div>
          <div style={{opacity:.7, marginBottom:8}}>Links</div>
          <div style={{display:"grid", gap:8}}>
            <a href="/pricing">{t("footer.pricing")}</a>
            <a href="/examples">{t("footer.examples")}</a>
            <a href="/gdpr">{t("footer.gdpr")}</a>
            <a href="/terms">{t("footer.terms")}</a>
            <a href="/impressum">{t("footer.imprint")}</a>
            <a href="/contact">{t("footer.contact")}</a>
          </div>
        </div>
        <div>
          <div style={{opacity:.7, marginBottom:8}}>Legal</div>
          <div style={{fontSize:12, opacity:.7}}>
            <div>Company (Impressum placeholder)</div>
            <div>VAT: ATU XXXXXXXX</div>
            <div>Address line 1</div>
            <div>Country</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

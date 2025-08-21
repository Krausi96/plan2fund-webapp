
import React from "react";
import { useI18n } from "../lib/i18n.js";
export default function Footer(){
  const { t } = useI18n();
  return (
    <footer>
      <div className="container" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,alignItems:"center"}}>
        <div><a href="/contact.html">{t("footer.contact")}</a></div>
        <div><a href="/terms.html">{t("footer.terms")}</a></div>
        <div><a href="/gdpr.html">{t("footer.privacy")}</a></div>
        <div><a href="/impressum.html">{t("footer.legal")}</a></div>
        <div className="legal">{t("footer.copy")}</div>
      </div>
    </footer>
  );
}

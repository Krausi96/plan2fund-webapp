import React from "react"; import { useI18n } from "../lib/i18n";
export default function Footer(){
  const { t } = useI18n();
  const links=[{href:"/pricing",label:t("nav.pricing")||"Pricing"},{href:"/gdpr",label:t("nav.gdpr")||"GDPR"},{href:"/terms",label:t("nav.terms")||"Terms"},{href:"/impressum",label:t("nav.impressum")||"Impressum"},{href:"/contact",label:t("nav.contact")||"Contact"}];
  return (<footer style={{borderTop:"1px solid var(--color-border)",marginTop:32}}>
    <div className="container" style={{padding:"24px 0",display:"flex",gap:16,flexWrap:"wrap",alignItems:"center",justifyContent:"space-between"}}>
      <div>Â© {new Date().getFullYear()} Plan2Fund</div>
      <nav style={{display:"flex",gap:16,flexWrap:"wrap"}}>{links.map((l,i)=>(<a key={i} href={l.href} style={{textDecoration:"none",color:"inherit"}}>{l.label}</a>))}</nav>
    </div>
  </footer>);
}

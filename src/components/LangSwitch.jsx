
import React from "react";
import { useI18n } from "../lib/i18n.js";

export default function LangSwitch() {
  const { lang, setLang, available } = useI18n();
  return (
    <select aria-label="Language" value={lang} onChange={(e)=>setLang(e.target.value)} style={{background:"transparent", color:"inherit", border:"1px solid rgba(255,255,255,0.18)", borderRadius:10, padding:"6px 8px"}}>
      {available.map(code => <option key={code} value={code} style={{color:"black"}}>{code.toUpperCase()}</option>)}
    </select>
  );
}

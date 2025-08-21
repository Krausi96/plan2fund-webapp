import React,{useSyncExternalStore} from "react"; import { useI18n } from "../lib/i18n";
export default function LangSwitch(){ const i18n=useI18n(); useSyncExternalStore(i18n.subscribe,()=>i18n.lang,()=>i18n.lang);
  return (<div role="group" aria-label="Language switcher" style={{display:"inline-flex",border:"1px solid var(--color-border)",borderRadius:"12px",overflow:"hidden"}}>
    {["en","de"].map(l=>(<button key={l} className="button" onClick={()=>i18n.setLang(l)} style={{background:i18n.lang===l?"var(--color-primary)":"#fff",color:i18n.lang===l?"#fff":"var(--color-fg)",borderRadius:0,padding:"8px 12px",minHeight:36}}>{l.toUpperCase()}</button>))}
  </div>);
}

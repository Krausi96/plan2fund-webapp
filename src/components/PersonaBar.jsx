
import React, { useEffect, useState } from "react";
import { useI18n } from "../lib/i18n.js";

export default function PersonaBar(){
  const { t } = useI18n();
  const [persona, setPersona] = useState(()=>{
    try { return localStorage.getItem("p2f.persona") || "newbie"; } catch { return "newbie"; }
  });
  const personas = t("personas.items", []);
  useEffect(()=>{ try{ localStorage.setItem("p2f.persona", persona); }catch{} }, [persona]);
  return (
    <section className="section" id="personal">
      <div className="container">
        <h2 style={{marginTop:0}}>{t("personas.title")}</h2>
        <div className="grid">
          {personas.map(p=>(
            <label key={p.id} className="card" style={{display:"grid",gap:6,cursor:"pointer",borderColor: persona===p.id ? "rgba(99,91,255,.6)" : "rgba(255,255,255,.08)"}}>
              <div style={{fontWeight:700}}>{p.title}</div>
              <div style={{opacity:.85}}>{p.desc}</div>
              <input type="radio" name="persona" value={p.id} checked={persona===p.id} onChange={()=>setPersona(p.id)} style={{justifySelf:"end"}}/>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}

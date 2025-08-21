
import React from "react";
import LangSwitch from "./LangSwitch.jsx";

export default function Header(){
  return (
    <header className="sticky">
      <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <a href="/" style={{fontWeight:700}}>Plan2Fund</a>
        <nav style={{display:"grid",gridAutoFlow:"column",gap:18,alignItems:"center"}}>
          <a href="/#personal">Personal</a>
          <a href="/#orgs">Organisations</a>
          <a href="/#build">Build your Freedom</a>
          <LangSwitch />
        </nav>
      </div>
    </header>
  );
}

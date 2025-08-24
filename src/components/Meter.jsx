import React from "react";
export default function Meter({value=0}){ const v = Math.max(0,Math.min(100,value)); return (<div className="pf-meter"><i style={{width:v+"%"}}/></div>); }

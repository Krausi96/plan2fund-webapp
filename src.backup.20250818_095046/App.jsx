import { useState, useEffect } from "react";
import FundingForm from "./components/FundingForm.jsx";
import Results from "./pages/Results.jsx";
import "./engine/selftest.js";
export default function App(){
  const [model,setModel]=useState(null); const [results,setResults]=useState([]);
  useEffect(()=>{ const t=window?.Plan2Fund?.runSelfTests?.(); console.log("SelfTests:", t); },[]);
  return (<div style={{maxWidth:920, margin:"0 auto", padding:"24px"}}>
    <header style={{marginBottom:16}}><h1>Plan2Fund</h1><p>Find EU & national funding that matches your startup.</p></header>
    {!model ? <FundingForm onSubmit={({model,results})=>{setModel(model); setResults(results);}}/> : <Results model={model} results={results} onBack={()=>{setModel(null); setResults([]);}}/>}
  </div>);
}
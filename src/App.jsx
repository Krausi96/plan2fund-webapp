import "../design/motion.css";
import "../design/theme.css";
import { useState } from "react";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import RecoPage from "./pages/RecoPage";
import PlanPage from "./pages/PlanPage";
import ResultsPage from "./pages/Results";
import CheckoutPage from "./pages/Checkout";
import AfterSales from "./pages/AfterSales";

export default function App(){
  const [step, setStep] = useState("landing");
  const [model, setModel] = useState(null);
  const [results, setResults] = useState([]);
  const [checkout, setCheckout] = useState(false);

  function handleNav(s){ setStep(s); }
  function onRecoDone(payload){
    setModel(payload.model);
    setResults(payload.results);
    setStep("results");
  }

  return (
    <div style={{maxWidth:1080, margin:"0 auto", padding:"18px"}}>
      {step!=="landing" && (<NavBar step={step} onNav={handleNav}/>)}
      {step==="landing" && (<LandingPage onReco={()=>setStep("reco")} onPlan={()=>setStep("plan")} />)}
      {step==="reco" && (<RecoPage onResults={onRecoDone} />)}
      {step==="plan" && (<PlanPage onPreview={(m)=>{ setModel(m); setStep("results"); }} />)}
      {step==="results" && !checkout && (
        <ResultsPage model={model||{}} results={results||[]} onBack={()=>{ setModel(null); setResults([]); setStep("landing"); }} />
      )}
      {checkout && (<CheckoutPage onSuccess={()=>{ setCheckout(false); setStep("after"); }} onCancel={()=>setCheckout(false)} />)}
      {step==="after" && (<AfterSales />)}
      <Footer />
    </div>
  );
}

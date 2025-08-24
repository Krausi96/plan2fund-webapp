import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import PriceTiers from "../components/PriceTiers";
import Meter from "../components/Meter";

export default function PreviewPricing(){
  const [score] = useState(68);
  return (
    <div>
      <Header/>
      <section className="pf-section">
        <div className="pf-wrap">
          <h2 style={{marginTop:0}}>Preview</h2>
          <div className="pf-grid">
            <Card title="Key Sections">
              <ul>
                <li>Executive Summary</li>
                <li>Problem & Solution</li>
                <li>Go-to-Market</li>
                <li>Financials</li>
              </ul>
            </Card>
            <Card title="Quality">
              <div>Completeness</div>
              <Meter value={72}/>
              <div style={{height:10}}/>
              <div>Complexity</div>
              <Meter value={score}/>
            </Card>
          </div>
        </div>
      </section>
      <PriceTiers/>
      <section className="pf-section">
        <div className="pf-wrap" style={{display:"flex",gap:12}}>
          <a className="pf-btn primary" href="/confirm">Continue</a>
          <a className="pf-btn" href="/reco">Back to Funding</a>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

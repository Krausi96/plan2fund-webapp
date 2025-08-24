import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
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
              <div>Completeness</div><Meter value={72}/>
              <div style={{height:10}}/>
              <div>Complexity</div><Meter value={score}/>
            </Card>
          </div>
        </div>
      </section>
      <section className="pf-section" id="pricing">
        <div className="pf-wrap pf-grid">
          <div className="pf-card"><h3 style={{marginTop:0}}>Custom Plan</h3><div style={{fontSize:24}}>?0?49</div><ul style={{paddingLeft:18}}><li>Outline</li><li>Key sections</li><li>Basic export</li></ul><button className="pf-btn" disabled>Select (Preview)</button></div>
          <div className="pf-card"><h3 style={{marginTop:0}}>Upgrade & Review</h3><div style={{fontSize:24}}>?149</div><ul style={{paddingLeft:18}}><li>Editor support</li><li>Reviewer notes</li><li>Eligibility map</li></ul><button className="pf-btn" disabled>Select (Preview)</button></div>
          <div className="pf-card"><h3 style={{marginTop:0}}>Strategy & Modelling</h3><div style={{fontSize:24}}>?299</div><ul style={{paddingLeft:18}}><li>Financial model stub</li><li>Timeline & KPIs</li><li>Pitch brief</li></ul><button className="pf-btn" disabled>Select (Preview)</button></div>
        </div>
      </section>
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

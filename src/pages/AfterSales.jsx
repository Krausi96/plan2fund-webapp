import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function AfterSales(){
  return (
    <div>
      <Header/>
      <section className="pf-section">
        <div className="pf-wrap pf-grid">
          <Card title="Request Revision (stub)">
            <label>Describe changes<br/><textarea rows="4" style={{width:"100%"}}/></label>
            <div style={{height:8}}/>
            <button className="pf-btn" disabled>Send</button>
            <p style={{fontSize:12,opacity:.8}}>Placeholder email workflow.</p>
          </Card>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

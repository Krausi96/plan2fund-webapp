import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Confirmation(){
  return (
    <div>
      <Header/>
      <section className="pf-section">
        <div className="pf-wrap pf-grid">
          <Card title="Cart Summary">
            <ul><li>Plan Type: Custom Plan</li><li>Docs: CV, Project Summary</li></ul>
            <div style={{marginTop:10,display:"flex",gap:10}}>
              <a className="pf-btn primary" href="/checkout">Checkout</a>
              <a className="pf-btn" href="/preview">Back</a>
            </div>
          </Card>
          <Card title="Notes"><p>You can request a revision after delivery (stub).</p></Card>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

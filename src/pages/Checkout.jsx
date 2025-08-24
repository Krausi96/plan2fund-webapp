import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import flags from "../config/flags.json";
export default function Checkout(){
  return (
    <div>
      <Header/>
      <section className="pf-section">
        <div className="pf-wrap pf-grid">
          <Card title="Summary">
            <ul><li>Plan: Custom Plan</li><li>Total: ?49</li></ul>
            <button className="pf-btn primary" disabled={!flags.CHECKOUT_ENABLED}>{flags.CHECKOUT_ENABLED? "Pay now":"Pay (disabled)"}</button>
          </Card>
          <Card title="Payment (stub)">
            <p>Cardholder, card number, expiry, CVC (disabled)</p>
          </Card>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Pricing() {
  return (
    <>
      <Header />
      <main className="section white">
        <h1 className="text-center mb-8">Pricing</h1>
        <div className="pricing-grid card-grid">
          <div className="card">
            <h3>Free</h3>
            <p>Basic plan builder access.</p>
            <button className="btn btn-secondary">Start Free</button>
          </div>
          <div className="card">
            <h3>Pro</h3>
            <p>Advanced overlays, insights, export. <em>(Checkout disabled)</em></p>
            <button className="btn btn-primary" disabled>Coming Soon</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RecoPage() {
  return (
    <>
      <Header />
      <main className="section light">
        <h1 className="text-center mb-8">Funding Recommendations</h1>
        <p className="text-center mb-12">
          Discover programs tailored to your project profile.
        </p>
        <div className="card-grid">
          <div className="card">
            <h3>EU Grants</h3>
            <p>Matched to your business stage and industry.</p>
          </div>
          <div className="card">
            <h3>Local Funds</h3>
            <p>Explore regional and national funding sources.</p>
          </div>
          <div className="card">
            <h3>Private Support</h3>
            <p>Investor and accelerator matches.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import React from "react";
import Hero from "../components/Hero";
import UseCases from "../components/UseCases";
import Included from "../components/Included";
import Offers from "../components/Offers";

import "../design/tokens.css";
import "../design/base.css";
import "../design/components.css";
import "../design/motion.css";

export default function LandingPage() {
  return (
    <>
      <Hero />

      <section className="section white">
        <h2 className="text-center">Our Offer</h2>
        <div className="product-grid">
          <Offers />
        </div>
        <div className="text-center mt-8">
          <a href="/reco" className="btn btn-primary">Get Recommendations</a>
          <a href="/plan" className="btn btn-secondary ml-4">Start Planning</a>
        </div>
      </section>

      <section className="section white">
        <Included />
      </section>

      <section className="section light">
        <UseCases />
      </section>

      <div className="text-center mt-12">
        <a href="/reco" className="btn btn-primary">Get Recommendations</a>
        <a href="/plan" className="btn btn-secondary ml-4">Start Planning</a>
      </div>
    </>
  );
}


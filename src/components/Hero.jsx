import React from "react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="orbs"></div>
      </div>
      <div className="hero-inner text-center">
        <h1 className="hero-title">Plan Smarter, Fund Faster</h1>
        <p className="hero-sub">
          The platform that helps you discover, compare, and plan funding opportunities with clarity.
        </p>
        <div className="hero-cta">
          <a href="/reco" className="btn btn-primary">Get Recommendations</a>
          <a href="/plan" className="btn btn-secondary ml-4">Start Planning</a>
        </div>
      </div>
    </section>
  );
}


import React from "react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="dollar-stream"></div>
      </div>
      <div className="hero-inner text-center">
        <h1 className="hero-title">
          Freedom starts with a clear plan – let’s build yours
        </h1>
        <p className="hero-sub">
          AI-powered funding and business plan builder.
        </p>
        <div className="hero-cta">
          <a href="/reco" className="btn btn-primary">Find Funding</a>
          <a href="/plan" className="btn btn-secondary ml-4">Generate Business Plan</a>
        </div>
      </div>
    </section>
  );
}

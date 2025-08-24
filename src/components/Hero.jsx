import React from "react";
import "../design/theme.css";
import "../design/motion.css";

export default function Hero() {
  return (
    <section className="hero relative text-center">
      <div className="hero-bg">
        <div className="bg-icons">
          <span>📋</span>
          <span>🎯</span>
          <span>📈</span>
          <span>🤝</span>
        </div>
        <div className="emoji-rain">💶 💵 💡</div>
      </div>
      <div className="hero-inner">
        <h1 className="hero-title">
          Freedom starts with a clear plan — let’s build yours
        </h1>
        <p className="hero-sub">
          Find the right grants in Austria/EU and generate a sharp,
          investor-ready business plan. Clean UI, no spam, no trackers.
        </p>
        <div className="hero-cta">
          <a href="/reco" className="btn btn-primary">Find Funding</a>
          <a href="/plan" className="btn btn-secondary ml-4">Generate Plan</a>
        </div>
      </div>
    </section>
  );
}

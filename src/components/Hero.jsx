import React from "react";
import "../design/components.css";
import "../design/motion.css";

export default function Hero() {
  return (
    <section className="hero relative text-center">
      <div className="hero-bg">
        {/* Animated background icons (action plan style) */}
        <div className="bg-icons">
          <span className="icon">??</span>
          <span className="icon">??</span>
          <span className="icon">??</span>
          <span className="icon">??</span>
        </div>
        {/* Emoji rain */}
        <div className="emoji-rain">?? ?? ??</div>
      </div>
      <div className="hero-inner">
        <h1 className="hero-title">Freedom starts with a clear plan — let’s build yours</h1>
        <p className="hero-sub">
          Find the right grants in Austria/EU and generate a sharp, investor-ready business plan.
          Clean UI, no spam, no trackers.
        </p>
        <div className="hero-cta">
          <a href="/reco" className="btn btn-primary">Find Funding</a>
          <a href="/plan" className="btn btn-secondary ml-4">Generate Plan</a>
        </div>
        <div className="hero-trust mt-6 text-sm">
          GDPR • Terms • Contact • Pricing • Examples
        </div>
      </div>
    </section>
  );
}

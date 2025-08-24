import React from "react";
import "../design/theme.css";
import "../design/motion.css";

export default function Hero() {
  return (
    <section className="hero relative flex flex-col items-center justify-center text-center min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="hero-bg absolute inset-0 bg-gradient-to-br from-[#0a2540] to-[#1a365d] z-0">
        <div className="bg-icons">
          <span>📋</span>
          <span>🎯</span>
          <span>📈</span>
          <span>💶</span>
        </div>
        <div className="emoji-rain">💶 💵 💡</div>
      </div>

      {/* Hero Content */}
      <div className="hero-inner relative z-10 px-6 py-24 max-w-4xl mx-auto animate-fade">
        <h1 className="hero-title text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
          Freedom starts with a clear plan — let’s build yours
        </h1>
        <p className="hero-sub mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
          Find the right grants in Austria/EU and generate a sharp,
          investor-ready business plan. Clean UI, no spam, no trackers.
        </p>
        <div className="hero-cta mt-8 flex justify-center gap-4">
          <a href="/reco" className="btn btn-primary">Find Funding</a>
          <a href="/plan" className="btn btn-secondary">Generate Plan</a>
        </div>
      </div>
    </section>
  );
}

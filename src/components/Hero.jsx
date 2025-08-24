import React from "react";

export default function Hero() {
  return (
    <section className="hero relative flex flex-col items-center justify-center text-center min-h-screen overflow-hidden">
      <div className="hero-bg absolute inset-0 bg-gradient-to-br from-[#0a2540] to-[#1a365d] z-0">
        <div className="bg-icons">
          <span>📋</span>
          <span>🎯</span>
          <span>📈</span>
          <span>💶</span>
        </div>
        <div className="emoji-rain">💶 💵 💡</div>
      </div>
      <div className="hero-inner relative z-10 px-6 max-w-4xl mx-auto animate-fade">
        <h1 className="hero-title">Freedom starts with a clear plan — let’s build yours</h1>
        <p className="hero-sub mt-6">
          Find the right grants in Austria/EU and generate a sharp, investor-ready business plan.
        </p>
        <div className="hero-cta mt-8 flex justify-center gap-4">
          <a href="/reco" className="btn btn-primary">Find Funding</a>
          <a href="/plan" className="btn btn-secondary">Generate Plan</a>
        </div>
      </div>
    </section>
  );
}

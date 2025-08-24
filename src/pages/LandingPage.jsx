import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

import "../styles.css";
import "../design/theme.css";
import "../design/motion.css";

export default function LandingPage() {
  return (
    <>
      <NavBar />
      <Hero />

      {/* Intro */}
      <section className="section light border-top text-center animate-fade">
        <p className="text-lg">
          Whether you’re shaping an idea, applying for funding or preparing a visa —
          we turn your thoughts, drafts or existing business into a submission & funding-ready Business Plan.
        </p>
        <p className="mt-4 text-lg">
          Built to meet standards of institutions, banks & public funding programs
          nationally & internationally.
        </p>
      </section>

      {/* Use Cases */}
      <section className="section white border-top text-center animate-up">
        <h2>Take your startup further, faster</h2>
        <div className="card-grid">
          <div className="card"><h3>Minimal User</h3><p>Essentials only; defaults & uploads complete the plan.</p></div>
          <div className="card"><h3>Power User</h3><p>Choose program and jump straight to required sections.</p></div>
          <div className="card"><h3>Idea-only User</h3><p>Guided lean path with defaults and recommendations.</p></div>
        </div>
      </section>

      {/* Products */}
      <section className="section light border-top text-center animate-fade">
        <h2>Products</h2>
        <div className="card-grid">
          <div className="card"><h3>Business Plan Builder</h3><p>Baselines, overlays, finances up to 24 months.</p></div>
          <div className="card"><h3>Preview</h3><p>Eligibility stamp, price tier, timeline. (Checkout disabled)</p></div>
          <div className="card"><h3>Export</h3><p>DOC/PDF export (disabled for now)</p></div>
          <div className="card"><h3>After-Sales</h3><p>Subscriptions & revisions (coming soon)</p></div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section white border-top text-center animate-up">
        <h2>How It Works</h2>
        <div className="flow-steps">
          <div className="step"><span className="step-num">1</span> Input your idea → corpus-driven plan</div>
          <div className="step"><span className="step-num">2</span> Add overlays: finances, program requirements</div>
          <div className="step"><span className="step-num">3</span> Preview eligibility & pricing (future checkout/export)</div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section light border-top text-center animate-fly">
        <h2>Global Impact</h2>
        <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div><strong>500M+</strong><p>Funding opportunities indexed</p></div>
          <div><strong>135+</strong><p>Countries supported</p></div>
        </div>
        <div className="globe-placeholder mt-8">🌍 [Animated Globe Here]</div>
      </section>

      <Footer />
    </>
  );
}

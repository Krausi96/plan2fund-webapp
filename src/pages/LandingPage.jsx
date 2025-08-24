import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../design/tokens.css";
import "../design/base.css";
import "../design/components.css";
import "../design/motion.css";

export default function LandingPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="hero relative text-center">
        <div className="hero-bg">
          <div className="bg-icons">
            <span>??</span>
            <span>??</span>
            <span>??</span>
            <span>??</span>
          </div>
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

      {/* Intro */}
      <section className="section light border-top text-center" data-animate="fade-in">
        <p>
          Whether you’re shaping an idea, applying for funding or preparing a visa —
          we turn your thoughts, drafts or existing business into a submission &
          funding-ready Business Plan.
        </p>
        <p className="mt-4">
          Built to meet standards of institutions, banks & public funding programs
          nationally & internationally.
        </p>
      </section>

      {/* Use Cases */}
      <section className="section white border-top text-center">
        <h2>Use Cases</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Minimal User</h3>
            <p>Answer essentials only; defaults + uploads complete the plan.</p>
          </div>
          <div className="card">
            <h3>Power User</h3>
            <p>Selects program and jumps straight to required sections.</p>
          </div>
          <div className="card">
            <h3>Idea-only User</h3>
            <p>Guided lean path with defaults and recommendations.</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section light border-top text-center">
        <h2>Products</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Business Plan Builder</h3>
            <p>Baseline, overlays, finances up to 24 months.</p>
          </div>
          <div className="card">
            <h3>Preview</h3>
            <p>Eligibility stamp, price tier, timeline. (Checkout disabled)</p>
          </div>
          <div className="card">
            <h3>Export</h3>
            <p>DOC/PDF export. (Disabled for now)</p>
          </div>
          <div className="card">
            <h3>After-sales</h3>
            <p>Subscriptions & emails (coming soon).</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section white border-top text-center" data-animate="slide-up">
        <h2>How It Works</h2>
        <ol className="checklist max-w-2xl mx-auto">
          <li>Input your idea ? corpus-driven plan</li>
          <li>Add overlays: finances, program requirements</li>
          <li>Preview with eligibility & pricing (future checkout/export)</li>
        </ol>
      </section>

      {/* Advantages */}
      <section className="section light border-top text-center" data-animate="fly-in">
        <h2>Global Impact</h2>
        <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div><strong>500M+</strong><p>Funding opportunities indexed</p></div>
          <div><strong>135+</strong><p>Countries supported</p></div>
        </div>
        <div className="globe-placeholder mt-8">?? [Globe Animation]</div>
      </section>

      <Footer />
    </>
  );
}

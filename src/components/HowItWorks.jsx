import React from "react";

export default function HowItWorks() {
  return (
    <div className="text-center max-w-3xl mx-auto" data-animate="fade-in">
      <h2 className="mb-8">How It Works</h2>
      <ol className="checklist">
        <li>Input your idea ? get structured plan from corpus</li>
        <li>Add overlays: finances, targeted programs</li>
        <li>Preview with eligibility & price tier (future: checkout & export)</li>
      </ol>
    </div>
  );
}

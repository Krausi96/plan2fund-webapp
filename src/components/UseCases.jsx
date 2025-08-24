import React from "react";

export default function UseCases() {
  return (
    <div className="text-center" data-animate="slide-up">
      <h2 className="mb-8">Use Cases</h2>
      <div className="card-grid">
        <div className="card">
          <h3>Minimal User</h3>
          <p>Answer only essentials, defaults + uploads do the rest.</p>
        </div>
        <div className="card">
          <h3>Power User</h3>
          <p>Selects program and jumps to required sections.</p>
        </div>
        <div className="card">
          <h3>Idea-only User</h3>
          <p>Lean guided path with defaults and smart recommendations.</p>
        </div>
      </div>
    </div>
  );
}

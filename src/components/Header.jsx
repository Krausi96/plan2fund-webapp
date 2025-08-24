import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-3">
      <div className="font-bold text-lg">Plan2Fund</div>
      <nav className="flex gap-4">
        <a href="/">Home</a>
        <a href="/plan">Plan Builder</a>
        <a href="/reco">Recommendations</a>
        <a href="/pricing">Pricing</a>
      </nav>
    </header>
  );
}

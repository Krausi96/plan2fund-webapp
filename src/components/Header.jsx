import React from "react";

export default function Header() {
  return (
    <header className="header flex justify-between items-center px-6 py-3">
      <div className="font-bold text-lg">Plan2Fund</div>
      <nav className="flex gap-6 text-sm">
        <a href="/pricing">Pricing</a>
        <a href="/examples">Examples</a>
        <a href="/contact">Contact</a>
        <a href="/gdpr">GDPR</a>
      </nav>
    </header>
  );
}

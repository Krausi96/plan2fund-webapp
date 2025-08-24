import React from "react";

export default function Header() {
  return (
    <header className="header flex justify-between items-center px-8 py-4">
      <div className="font-bold text-xl text-primary">Plan2Fund</div>
      <nav className="flex gap-8 text-sm font-medium">
        <a href="/pricing">Pricing</a>
        <a href="/examples">Examples</a>
        <a href="/contact">Contact</a>
        <a href="/gdpr">GDPR</a>
      </nav>
    </header>
  );
}

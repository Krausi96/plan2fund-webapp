import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <h4>Product</h4>
          <a href="/plan">Business Plan</a>
          <a href="/reco">Recommendations</a>
          <a href="/pricing">Pricing</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="/about">About</a>
          <a href="/legal">Legal</a>
          <a href="/contact">Contact</a>
        </div>
        <div>
          <h4>Resources</h4>
          <a href="/docs">Docs</a>
          <a href="/faq">FAQ</a>
        </div>
      </div>
      <div className="text-center mt-8 text-sm text-gray-500">
        © 2025 Plan2Fund. All rights reserved.
      </div>
    </footer>
  );
}

import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h4>Plan2Fund</h4>
          <p>Freedom starts with a clear plan.</p>
        </div>
        <div>
          <h4>Legal</h4>
          <a href="/gdpr">GDPR</a>
          <a href="/terms">Terms</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="/contact">Contact</a>
          <a href="/pricing">Pricing</a>
        </div>
        <div>
          <h4>Resources</h4>
          <a href="/examples">Examples</a>
          <a href="/docs">Docs</a>
        </div>
      </div>
      <div className="text-center mt-8 text-sm text-gray-500">
        © 2025 Plan2Fund • Made in EU • No trackers
      </div>
    </footer>
  );
}

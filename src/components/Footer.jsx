import React from "react";

function Footer() {
  return (
    <footer className="py-12 px-6 bg-gray-900 text-gray-400 border-t border-gray-800 mt-auto">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="text-white font-semibold mb-2">Plan2Fund</h4>
          <p>Freedom starts with a clear plan.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Legal</h4>
          <ul>
            <li><a href="/legal" className="hover:text-white">GDPR</a></li>
            <li><a href="/legal" className="hover:text-white">Terms</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul>
            <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="/examples" className="hover:text-white">Examples</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Resources</h4>
          <ul>
            <li><a href="/docs" className="hover:text-white">Docs</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-500">
        © 2025 Plan2Fund • Made in EU • No trackers
      </div>
    </footer>
  );
}

export default Footer;

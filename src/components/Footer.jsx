import React from "react";
export default function Footer(){
  return (
    <footer className="pf-footer pf-section">
      <div className="pf-wrap">
        <div className="pf-footer-grid">
          <div><strong>Plan2Fund</strong><p>Freedom starts with a clear plan.</p></div>
          <div><strong>Legal</strong><div><a href="/legal">GDPR</a></div><div><a href="/terms">Terms</a></div></div>
          <div><strong>Company</strong><div><a href="/#contact">Contact</a></div><div><a href="/#pricing">Pricing</a></div></div>
          <div><strong>Resources</strong><div><a href="/#examples">Examples</a></div><div><a href="/#docs">Docs</a></div></div>
        </div>
        <div style={{borderTop:"1px solid var(--pf-line)",paddingTop:12,display:"flex",justifyContent:"space-between",fontSize:12}}>
          <span>? {new Date().getFullYear()} Plan2Fund</span>
          <span>Made in EU ? No trackers</span>
        </div>
      </div>
    </footer>
  );
}

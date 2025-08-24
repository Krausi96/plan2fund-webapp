import React from "react";
export default function TrustBar(){
  return (
    <section className="pf-trust pf-section">
      <div className="pf-wrap pf-trust-grid">
        <div className="pf-trust-item" title="GDPR">
          <div className="pf-trust-badge">GDPR</div><span>Compliant</span>
        </div>
        <div className="pf-trust-item" title="EU Programs">
          <div className="pf-trust-badge">EU</div><span>Horizon, EIC</span>
        </div>
        <div className="pf-trust-item" title="Austrian Grants">
          <div className="pf-trust-badge">AT</div><span>AWS, FFG</span>
        </div>
        <div className="pf-trust-item" title="No trackers">
          <div className="pf-trust-badge">\u2713</div><span>No trackers</span>
        </div>
      </div>
    </section>
  );
}

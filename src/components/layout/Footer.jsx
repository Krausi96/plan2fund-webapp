import React from "react";
import { Link } from "react-router-dom";

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand">Plan2Fund</div>
          <div className="muted">Submission-ready plans for funding, visas, and banks.</div>
        </div>
        <div>
          <div className="muted" style={{marginBottom:8}}>Links</div>
          <div className="links">
            <Link to="/contact">Contact</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/gdpr">Data Privacy</Link>
            <Link to="/legal">Legal Notice</Link>
          </div>
        </div>
        <div className="muted" style={{textAlign:'right'}}>Â©2025 Plan2Fund. All rights reserved.</div>
      </div>
    </footer>
  );
}

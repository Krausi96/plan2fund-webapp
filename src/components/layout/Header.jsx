import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header(){
  const { pathname } = useLocation();
  return (
    <header className="site-header">
      <div className="container header-row">
        <Link to="/" className="brand" aria-label="Plan2Fund Home">Plan2Fund</Link>
        <nav className="nav">
          <Link to="/"            className={pathname==="/"               ? "active" : ""}>Home</Link>
          <Link to="/reco"        className={pathname.startsWith("/reco") ? "active" : ""}>Find Funding</Link>
          <Link to="/plan"        className={pathname.startsWith("/plan") ? "active" : ""}>Business Plan</Link>
          <Link to="/pricing"     className={pathname.startsWith("/pricing") ? "active" : ""}>Pricing</Link>
          <Link to="/legal"       className={pathname.startsWith("/legal")? "active" : ""}>Legal</Link>
        </nav>
      </div>
    </header>
  );
}

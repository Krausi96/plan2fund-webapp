param(
  [string]$ProjectRoot = "C:\Users\kevin\plan2fund\one_prompt_webapp_agent_package\plan2fund-webapp"
)
$ErrorActionPreference = "Stop"
Set-Location $ProjectRoot

# --- Ensure folders exist
$paths = @(
  "src\components\layout",
  "src\pages",
  "src\design",
  "tools"
)
$paths | ForEach-Object { if (-not (Test-Path $_)) { New-Item -ItemType Directory -Force -Path $_ | Out-Null } }

# --- App shell / routing wrapper
@'
import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { Outlet, useLocation } from "react-router-dom";
import "../../design/theme.css";
import "../../design/motion.css";
import "../../design/hotfix-final.css";

export default function AppShell(){
  const { pathname } = useLocation();
  const onLanding = pathname === "/";
  return (
    <div className="app-shell">
      <Header/>
      {!onLanding && <Breadcrumbs/>}
      <main role="main"><Outlet/></main>
      <Footer/>
    </div>
  );
}
'@ | Set-Content -Encoding UTF8 "src\components\layout\AppShell.jsx"

# --- Header
@'
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
'@ | Set-Content -Encoding UTF8 "src\components\layout/Header.jsx"

# --- Footer
@'
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
        <div className="muted" style={{textAlign:'right'}}>©2025 Plan2Fund. All rights reserved.</div>
      </div>
    </footer>
  );
}
'@ | Set-Content -Encoding UTF8 "src\components\layout/Footer.jsx"

# --- Simple Breadcrumbs (shows off landing)
@'
import React from "react";
import { Link, useLocation } from "react-router-dom";
const LABELS = { "reco":"Find Funding", "plan":"Business Plan", "results":"Results", "pricing":"Pricing", "legal":"Legal" };
export default function Breadcrumbs(){
  const { pathname } = useLocation();
  if(pathname==="/") return null;
  const parts = pathname.replace(/^\/+/,"").split("/").filter(Boolean);
  const crumbs = [["/","Home"]].concat(parts.map((p,i)=>["/"+parts.slice(0,i+1).join("/"), LABELS[p]||p]));
  return (
    <nav aria-label="Breadcrumb" className="container" style={{padding:"10px 0"}}>
      {crumbs.map(([href,label],i)=>(
        <span key={href}>
          {i>0 && <span style={{opacity:.6}}> › </span>}
          {i<crumbs.length-1 ? <Link to={href}>{label}</Link> : <span aria-current="page" style={{opacity:.8}}>{label}</span>}
        </span>
      ))}
    </nav>
  );
}
'@ | Set-Content -Encoding UTF8 "src\components\layout/Breadcrumbs.jsx"

# --- Landing page (white hero title, animated wash, clickable cards, what's included)
@'
import { Link, useNavigate } from "react-router-dom";

function WhatsIncluded(){
  const items = [
    "A structured, submission-ready business plan or document",
    "Delivered as Google Doc or Word (PDF optional, editable for reuse)",
    "Includes a 1-Page Executive Summary that resumes your plan",
    "A Trust Agreement (NDA) signed by us (optional)",
    "Includes 1 free revision if your plan needs some adjustments",
    "Async: No calls or meetings required. Nevertheless, you can reach me"
  ];
  return (
    <section className="section light">
      <div className="container">
        <h2 className="section-h">🧾 What’s Included</h2>
        <ul className="checklist">
          {items.map((t,i)=>(<li key={i}><span className="check">✔</span> {t}</li>))}
        </ul>
      </div>
    </section>
  );
}

export default function LandingPage(){
  const nav = useNavigate();
  return (
    <>
      <section className="hero fly-in" aria-label="Hero">
        <div className="container hero-content">
          <div className="badge">Submission-ready plans</div>
          <h1 className="hero-title">Freedom starts with a clear plan — let’s build yours.</h1>
          <p className="hero-sub">
            Turn your inputs into a submission-ready business plan aligned with the standards of banks,
            public funding programs, and visa applications.
          </p>
          <div className="cta-row">
            <button className="btn" onClick={()=>nav("/reco")} aria-label="Find Funding">Find Funding</button>
            <button className="btn primary" onClick={()=>nav("/plan")} aria-label="Generate Business Plan">Generate Business Plan</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-h">Use cases</h2>
          <div className="grid grid-cols-3">
            <Link to="/plan" className="card clickable"><strong>Visa applications</strong><p className="muted">RWR, Freelance Permit.</p></Link>
            <Link to="/reco" className="card clickable"><strong>Grants & public funding</strong><p className="muted">AWS PreSeed, FFG, EU calls.</p></Link>
            <Link to="/plan" className="card clickable"><strong>Bank loans & leasing</strong><p className="muted">Formatted for financial standards.</p></Link>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <h2 className="section-h">Our offer</h2>
          <div className="grid grid-cols-3">
            <div className="card light">
              <div className="badge">15–35 pages</div>
              <strong>Custom Business Plan</strong>
              <p className="muted dark">Submission-ready, aligned with institutional requirements.</p>
            </div>
            <div className="card light">
              <div className="badge">Upgrade & Review</div>
              <strong>Expert revision</strong>
              <p className="muted dark">Formatting and edits for AWS, FFG, banks or visa.</p>
            </div>
            <div className="card light">
              <div className="badge">4–8 pages</div>
              <strong>Strategy & Modelling</strong>
              <p className="muted dark">Shape model & strategy for early-stage ideas.</p>
            </div>
          </div>
          <div className="cta-row center">
            <Link to="/reco" className="btn">Find Funding</Link>
            <Link to="/plan" className="btn primary">Generate Business Plan</Link>
          </div>
        </div>
      </section>

      <WhatsIncluded/>
    </>
  );
}
'@ | Set-Content -Encoding UTF8 "src\pages\LandingPage.jsx"

# --- Motion CSS (ensures animation class exists)
@'
@media (prefers-reduced-motion: no-preference){
  .fly-in{animation:flyin .36s ease both}
  @keyframes flyin{from{opacity:.0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
}
'@ | Set-Content -Encoding UTF8 "src\design\motion.css"

# --- Final override stylesheet (kills purple links, fixes hero/sections/cards/buttons/footer/header)
@'
/* === HOTFIX: final unified polish === */
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0;background:#0b0f14;color:#eaf1fa;font:16px/1.5 Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}
a,a:visited{color:#9ecbff;text-decoration:none} a:hover{opacity:.9}
.container{max-width:1120px;margin:0 auto;padding:24px}
.muted{color:#a7b3c6}

/* Header */
.site-header{position:sticky;top:0;z-index:50;border-bottom:1px solid rgba(255,255,255,.08);
  backdrop-filter:saturate(120%) blur(8px);background:rgba(11,15,20,.8)}
.header-row{display:flex;align-items:center;justify-content:space-between;height:64px}
.brand{font-weight:800;letter-spacing:.2px;color:#eaf1fa}
.nav{display:flex;gap:18px} .nav a{opacity:.9} .nav a.active{opacity:1}

/* Footer */
.site-footer{border-top:1px solid rgba(255,255,255,.08);background:#0b0f14}
.footer-grid{display:grid;gap:16px;grid-template-columns:2fr 1fr 1fr;align-items:start}
.footer-grid .links{display:grid;gap:6px}

/* Buttons */
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 16px;border-radius:14px;
  border:1px solid rgba(255,255,255,.15);background:transparent;color:#eaf1fa;cursor:pointer}
.btn.primary{background:linear-gradient(90deg,#4da3ff,#7bc4ff);border:0;color:#06101a;font-weight:600}
.btn:focus{outline:none;box-shadow:0 0 0 3px rgba(77,163,255,.32)} .cta-row{display:flex;gap:10px;margin-top:18px}
.cta-row.center{justify-content:center}

/* Hero */
.hero{position:relative;isolation:isolate;border-radius:28px;margin:16px 0 28px;background:linear-gradient(180deg,#10161f,#0b0f14)}
.hero-content{padding:96px 32px}
.hero .badge{display:inline-flex;gap:8px;align-items:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);
  color:#a7b3c6;padding:6px 12px;border-radius:999px;font-size:12px}
.hero-title{font-size:64px;line-height:1.06;letter-spacing:-.02em;margin:12px 0 12px;color:#fff}
.hero-sub{max-width:780px;color:#a7b3c6;font-size:18px}
.hero::before,.hero::after{content:"";position:absolute;inset:-20%;pointer-events:none}
.hero::before{background:
  radial-gradient(420px 300px at 80% -10%, rgba(123,196,255,.25), transparent 60%),
  radial-gradient(280px 220px at 12% 20%, rgba(169,255,239,.16), transparent 65%)}
.hero::after{background:radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.12) 0 60%, transparent 61%) repeat;
  mix-blend-mode:screen;opacity:.22;transform:translateZ(0)}
@media (prefers-reduced-motion: no-preference){
  .hero::after{animation:drift 36s linear infinite}
  @keyframes drift{0%{transform:translate3d(0,0,0)}50%{transform:translate3d(-1%,1%,0)}100%{transform:translate3d(0,0,0)}}
}
.hero > *{position:relative;z-index:1}

/* Sections + Cards */
.section{padding:28px 0}
.section.light{background:#ffffff;color:#0b0f14}
.section-h{font-size:22px;margin:6px 0 14px}
.grid{display:grid;gap:18px} .grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
.card{background:linear-gradient(180deg,#121a24,#0f141b);border:1px solid rgba(255,255,255,.08);
  border-radius:18px;padding:20px;box-shadow:0 8px 24px rgba(0,0,0,.28)}
.card strong{display:block;margin-bottom:6px;font-size:16px;color:#eaf1fa}
.card.clickable{transition:transform .2s ease, border-color .2s ease, box-shadow .2s ease}
.card.clickable:hover{transform:translateY(-2px);border-color:rgba(123,196,255,.4);box-shadow:0 10px 32px rgba(0,0,0,.4)}
.card.light{background:#fff;border:1px solid rgba(0,0,0,.08);box-shadow:0 6px 18px rgba(0,0,0,.06)}
.card.light strong{color:#0b0f14}
.muted.dark{color:#3b495a}

/* Checklist */
.checklist{display:grid;gap:10px;margin:8px 0 4px;padding:0;list-style:none}
.checklist .check{display:inline-flex;width:22px;justify-content:center;font-weight:700;color:#2ecc71}
'@ | Set-Content -Encoding UTF8 "src\design\hotfix-final.css"

# --- App.jsx routes (wrap in AppShell + import hotfix)
@'
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./design/theme.css";
import "./design/motion.css";
import "./design/hotfix-final.css";
import AppShell from "./components/layout/AppShell.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import RecoPage from "./pages/RecoPage.jsx";
import Results from "./pages/Results.jsx";
import PlanPage from "./pages/PlanPage.jsx";
import Pricing from "./pages/Pricing.jsx";
import Checkout from "./pages/Checkout.jsx";
import AfterSales from "./pages/AfterSales.jsx";
import SuccessCancel from "./pages/SuccessCancel.jsx";
import Legal from "./pages/Legal.jsx";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell/>}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/reco" element={<RecoPage />} />
          <Route path="/results" element={<Results />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/after-sales" element={<AfterSales />} />
          <Route path="/success" element={<SuccessCancel />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/welcome" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
'@ | Set-Content -Encoding UTF8 "src\App.jsx"

Write-Host "`n✅ Files written. Building..." -ForegroundColor Cyan
npm install
npm run build
Write-Host "`n✅ HOTFIX applied. Start dev with: npm run dev" -ForegroundColor Green

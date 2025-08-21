import React from 'react';

function Card({title, body, foot}) {
  const card = {border:"1px solid #e5e7eb", borderRadius:12, padding:20, flex:"1 1 260px", minWidth:260};
  const h = {fontSize:18, fontWeight:600, margin:"0 0 8px 0"};
  const p = {fontSize:14, opacity:.9, margin:"0 0 12px 0"};
  const f = {fontSize:13, opacity:.8};
  return (
    <div style={card}>
      <h3 style={h}>{title}</h3>
      <p style={p}>{body}</p>
      <p style={f}>{foot}</p>
    </div>
  );
}

export default function Welcome() {
  const wrap = {maxWidth: 1080, margin:"0 auto", padding:"32px 24px"};
  const h1 = {fontSize:28, fontWeight:700, margin:"0 0 8px 0"};
  const sub = {fontSize:16, opacity:.9, margin:"0 0 16px 0"};
  const grid = {display:"flex", gap:16, flexWrap:"wrap", marginTop:16};
  const bar = {display:"flex", gap:8, margin:"16px 0"};
  const input = {flex:"1 1 auto", padding:"10px 12px", border:"1px solid #e5e7eb", borderRadius:8};
  const link = {padding:"10px 12px", border:"1px solid #e5e7eb", borderRadius:8, textDecoration:"none"};

  return (
    <main style={wrap} aria-label="Welcome">
      <h1 style={h1}>Welcome - Pick your path</h1>
      <p style={sub}>Create new, upgrade an existing plan, or shape your strategy. <strong>Includes 1 free revision.</strong></p>

      <div style={grid}>
        <Card
          title="Custom Business Plan (15-35 pages)"
          body="Turn your defined model into a submission-ready plan aligned with institutional and funding requirements."
          foot="Ideal for visa, grants or bank/lease applications."
        />
        <Card
          title="Upgrade and Review"
          body="Have a draft? We revise, re-structure, and upgrade to pass formatting and content checks."
          foot="Ideal when you need formatting, structure, or financial add-ons."
        />
        <Card
          title="Strategy and Modelling Plan (4-8 pages)"
          body="Shape target group, pricing and positioning to move confidently into development or planning."
          foot="Great for early-stage ideas; can be combined later with a full plan."
        />
      </div>

      <div style={bar} role="search">
        <input style={input} placeholder="Search (placeholder, non-functional for MVP)" aria-label="Search"/>
        <a href="#/faq" style={link}>FAQ</a>
        <a href="#/contact" style={link}>Contact</a>
        <a href="#/privacy" style={link}>Privacy</a>
        <a href="#/terms" style={link}>T&C</a>
      </div>

      <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
        <a href="#/plan" style={{...link, borderColor:"#0a84ff"}}>Start / Upgrade Plan</a>
        <a href="#/reco" style={{...link, borderColor:"#0a84ff"}}>Recommendation Wizard</a>
      </div>
    </main>
  );
}
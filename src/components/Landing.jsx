import React from 'react';

export default function Landing() {
  const box = {maxWidth: 960, margin: "0 auto", padding: "40px 24px"};
  const hero = {fontSize: "40px", lineHeight: 1.2, margin: "0 0 16px 0", fontWeight: 700};
  const sub  = {fontSize: "18px", opacity: 0.85, marginBottom: "24px"};
  const row  = {display: "flex", gap: "12px", flexWrap: "wrap"};
  const btn  = {padding: "12px 16px", border: "1px solid #0a84ff", borderRadius: 8, textDecoration: "none"};

  return (
    <main style={box} aria-label="Landing">
      <h1 style={hero}>Plan2Fund - Freedom starts with a clear plan</h1>
      <p style={sub}>
        Turn your inputs and ideas into submission-ready business documents aligned to institutional and funding requirements.
      </p>
      <div style={row}>
        <a href="#/welcome" style={{...btn, background:"#0a84ff", color:"#fff"}}>Go to Welcome</a>
        <a href="#/reco" style={btn}>Try Recommendation (Lead Magnet)</a>
      </div>
    </main>
  );
}
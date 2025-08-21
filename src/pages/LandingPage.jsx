/** Landing page (merged) — refined: subtle animation, compact hero, aligned blocks */
export default function LandingPage({ onReco, onPlan }) {
  const style = `
  .wrap{max-width:1120px;margin:0 auto;padding:0 16px}
  .hero{position:relative;margin-top:8px;padding:64px 0 56px;border-radius:20px;background:#0f172a;overflow:hidden}
  .hero h1{color:#f8fafc;font-size:44px;line-height:1.12;margin:0;text-align:center}
  .hero p{color:#cbd5e1;margin:14px 0 0;text-align:center}
  .cta{margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .cta button{padding:12px 20px;border-radius:12px;border:1px solid #1f2937;cursor:pointer;font-weight:800}
  .primary{background:#111827;color:#fff}
  .secondary{background:#fff;color:#111827}
  /* animated dots (business-style, very subtle) */
  .orb{position:absolute;border-radius:999px;opacity:.12;filter:blur(2px);animation:float 14s ease-in-out infinite}
  .orb.one{width:220px;height:220px;left:-60px;top:-40px;background:#60a5fa}
  .orb.two{width:180px;height:180px;right:-40px;top:-30px;background:#a78bfa;animation-duration:18s}
  .orb.three{width:140px;height:140px;left:40%;bottom:-60px;background:#34d399;animation-duration:20s}
  @keyframes float { 0%{transform:translateY(0)} 50%{transform:translateY(-18px)} 100%{transform:translateY(0)} }
  .section{padding:28px 0}
  .grid{display:grid;grid-template-columns:1fr;gap:16px}
  @media(min-width:900px){ .grid{grid-template-columns:repeat(3,1fr)} }
  .card{border:1px solid #e5e7eb;border-radius:16px;padding:18px;background:#fff}
  .muted{color:#475569}
  .section-title{font-size:20px;margin:0 0 6px 0}
  `;
  return (
    <div>
      <style>{style}</style>

      <section className="wrap hero">
        <div className="orb one"></div>
        <div className="orb two"></div>
        <div className="orb three"></div>

        <h1>Freedom starts with a clear plan – let&apos;s build yours.</h1>
        <p>AI‑powered funding and business plan builder.</p>
        <div className="cta">
          <button className="secondary" onClick={()=> onReco && onReco()}>Find Funding</button>
          <button className="primary" onClick={()=> onPlan && onPlan()}>Generate Business Plan</button>
        </div>
      </section>

      <div className="wrap">
        {/* Value props */}
        <section className="section">
          <div className="grid">
            <div className="card">
              <h3 className="section-title">Use cases</h3>
              <ul className="muted" style={{margin:0, paddingLeft:18, lineHeight:1.7}}>
                <li>Visa applications – RWR, freelance permit</li>
                <li>Grants & public funding – AWS PreSeed, FFG Basisprogramm, EU calls</li>
                <li>Bank loans or leasing</li>
                <li>Early‑stage ideas & self‑employment – AMS, WKO</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="section-title">Custom Business Plan (15–35 pages)</h3>
              <p className="muted">You already defined your model – vision, offer, market, target group, marketing, financials. We turn it into a submission‑ready plan aligned with institutional and funding requirements.</p>
              <p className="muted"><b>Ideal for:</b> visa, grant or loan/leasing applications.</p>
            </div>
            <div className="card">
              <h3 className="section-title">Upgrade & Review</h3>
              <p className="muted">Have a draft? We revise and upgrade to pass checks, including formatting, rewriting and expert edits for AWS, FFG, banks or visa programs.</p>
              <p className="muted"><b>Ideal for:</b> plans that need add‑ons or structure.</p>
            </div>
          </div>
        </section>

        {/* Strategy and Modelling */}
        <section className="section">
          <div className="card">
            <h3 className="section-title">Strategy and Modelling Plan (4–8 pages)</h3>
            <p className="muted">You have an idea but not all details – pricing, target group, positioning. We help you shape the model and strategy so you can move into development or a full plan.</p>
            <p className="muted">Can be combined with a Business Plan or Upgrade & Review.</p>
          </div>
        </section>

        {/* Included */}
        <section className="section" id="included">
          <div className="card">
            <h3 className="section-title">What’s included</h3>
            <ul className="muted" style={{margin:0, paddingLeft:18, lineHeight:1.7}}>
              <li>Structured, submission‑ready business plan or document</li>
              <li>Delivered as Google Doc or Word (PDF optional)</li>
              <li>Includes a 1‑page executive summary</li>
              <li>NDA on request</li>
              <li>One free revision for small adjustments</li>
              <li>Async by default – no meetings required</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
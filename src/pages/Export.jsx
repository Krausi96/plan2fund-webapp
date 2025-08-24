import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import flags from "../config/flags.json";

export default function Export(){
  return (
    <div>
      <Header/>
      <section className="pf-section">
        <div className="pf-wrap pf-grid">
          <Card title="Export">
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <button className="pf-btn" disabled>PDF (preview)</button>
              <button className="pf-btn" disabled={!flags.EXPORT_DOCX_ENABLED}>{flags.EXPORT_DOCX_ENABLED? "DOCX":"DOCX (disabled)"}</button>
            </div>
          </Card>
          <Card title="After-Sales">
            <a className="pf-btn" href="/after">Request revision</a>
          </Card>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

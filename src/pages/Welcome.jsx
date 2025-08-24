import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Card from "../components/Card";

export default function Welcome(){
  return (
    <div>
      <Header/>
      <Hero/>
      <section className="pf-section">
        <div className="pf-wrap">
          <div className="pf-grid">
            <Card title="Recommendation Engine">
              <p>Tell us your idea, sector, and location. We suggest the top grants and why.</p>
              <a className="pf-btn primary" href="/reco">Start Recommendation</a>
            </Card>
            <Card title="Business Plan Generator">
              <p>Compose an investor-friendly plan with editable blocks and preview.</p>
              <a className="pf-btn" href="/plan">Open Generator</a>
            </Card>
            <Card title="AI Plan Machine (stub)">
              <p>Upcoming: automated drafting with your inputs. Disabled for now.</p>
              <button className="pf-btn" disabled>Coming soon</button>
            </Card>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

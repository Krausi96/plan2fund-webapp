import React from 'react';

export function FAQ() { return (<section><h2>FAQ</h2><p>Placeholder content.</p></section>); }
export function Contact() { return (<section><h2>Contact</h2><p>hello@plan2fund.example (placeholder).</p></section>); }
export function Privacy() { return (<section><h2>Privacy</h2><p>GDPR statement placeholder.</p></section>); }
export function Terms() { return (<section><h2>Terms and Conditions</h2><p>Service terms placeholder.</p></section>); }

export default function LegalFAQ() {
  return (
    <main style={{maxWidth:960, margin:"0 auto", padding:"32px 24px"}}>
      <FAQ />
      <Contact />
      <Privacy />
      <Terms />
    </main>
  );
}
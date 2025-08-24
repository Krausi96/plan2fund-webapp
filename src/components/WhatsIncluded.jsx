import React from "react";

export default function WhatsIncluded(){
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
          {items.map((t,i)=>(
            <li key={i}><span className="check">✔</span> {t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PlanPage() {
  return (
    <>
      <Header />
      <main className="section white">
        <h1 className="text-center mb-8">Business Plan Builder</h1>
        <p className="text-center mb-12">
          Build your funding-ready business plan step by step. Start lean or dive deep with overlays.
        </p>
        <div className="max-w-3xl mx-auto">
          <ol className="checklist">
            <li>Input core details (idea, sector, location)</li>
            <li>Add overlays (finances, eligibility, funding programs)</li>
            <li>Preview structured plan ? eligibility stamp, pricing tier, timeline</li>
            <li className="text-gray-500 italic">Checkout & Export disabled (future step)</li>
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
}

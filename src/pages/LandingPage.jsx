import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import UseCases from "../components/UseCases";
import PlanCTA from "../components/PlanCTA";
import FeatureList from "../components/FeatureList";
import PricingTable from "../components/PricingTable";
import UserJourney from "../components/UserJourney";
import Footer from "../components/Footer";

import "../styles.css";
import "../design/theme.css";
import "../design/motion.css";

export default function LandingPage() {
  return (
    <>
      <NavBar />
      <Hero />
      <section className="section light border-top text-center animate-fade">
        <p className="text-lg">
          Whether you’re shaping an idea, applying for funding or preparing a visa —
          we turn your thoughts, drafts or existing business into a submission &
          funding-ready Business Plan.
        </p>
        <p className="mt-4 text-lg">
          Built to meet standards of institutions, banks & public funding programs
          nationally & internationally.
        </p>
      </section>
      <UseCases />
      <FeatureList />
      <PlanCTA />
      <PricingTable />
      <UserJourney />
      <Footer />
    </>
  );
}

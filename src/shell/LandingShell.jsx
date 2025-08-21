
import React from "react";
import Hero from "../components/Hero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import FeatureList from "../components/FeatureList.jsx";
import Steps from "../components/Steps.jsx";
import CTABand from "../components/CTABand.jsx";
import Footer from "../components/Footer.jsx";
import { useI18n } from "../lib/i18n.js";

export default function LandingShell() {
  const route = "/"; // this file renders landing; header hidden elsewhere
  const onFindFunding = () => { window.location.href = "/reco"; };
  const onCreatePlan = () => { window.location.href = "/plan"; };

  return (
    <div data-route={route} className="hidden-on-landing">
      <Hero onFindFunding={onFindFunding} onCreatePlan={onCreatePlan} />
      <ProductGrid />
      <FeatureList />
      <Steps />
      <CTABand onPrimary={onFindFunding} />
      <Footer />
    </div>
  );
}

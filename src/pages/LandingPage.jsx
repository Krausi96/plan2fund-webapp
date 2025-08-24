import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Hero from "../components/Hero";
import Intro from "../components/Intro";
import UseCases from "../components/UseCases";
import ProductGrid from "../components/ProductGrid";
import HowItWorks from "../components/HowItWorks";
import Numbers from "../components/Numbers";

import "../design/tokens.css";
import "../design/base.css";
import "../design/components.css";
import "../design/motion.css";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <section className="section light border-top">
          <Intro />
        </section>

        <section className="section white border-top">
          <UseCases />
        </section>

        <section className="section light border-top">
          <ProductGrid />
        </section>

        <section className="section white border-top">
          <HowItWorks />
        </section>

        <section className="section light border-top">
          <Numbers />
        </section>
      </main>
      <Footer />
    </>
  );
}

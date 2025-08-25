import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import InfoSection from "../components/InfoSection";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <NavBar />
      <Hero />
      <InfoSection />

      <section className="py-20 px-6 bg-gray-950 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ProductCard
            title="Recommendation Engine"
            description="Tell us your idea, sector, and location. We suggest the top grants and why."
            button="Start Recommendation"
          />
          <ProductCard
            title="Business Plan Generator"
            description="Compose an investor-friendly plan with editable blocks and preview."
            button="Open Generator"
          />
          <ProductCard
            title="AI Plan Machine (stub)"
            description="Upcoming: automated drafting with your inputs. Disabled for now."
            button="Coming Soon"
            disabled
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;

import React from 'react';
import Hero from '../components/Hero';
import InfoSection from '../components/InfoSection';
import UseCases from '../components/UseCases';
import ProductGrid from '../components/ProductGrid';
import Steps from '../components/Steps';
import NumbersSection from '../components/NumbersSection';

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-900">
      <Hero />
      <InfoSection />
      <UseCases />
      <ProductGrid />
      <Steps />
      <NumbersSection />
    </div>
  );
}

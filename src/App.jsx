import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import RecoPage from './pages/RecoPage';
import PlanPage from './pages/PlanPage';
import Results from './pages/Results';
import Checkout from './pages/Checkout';
import AfterSales from './pages/AfterSales';
import Pricing from './pages/Pricing';
import Legal from './pages/Legal';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/funding" element={<RecoPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/results" element={<Results />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/after" element={<AfterSales />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/legal" element={<Legal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

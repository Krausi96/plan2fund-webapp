import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PlanPage from "./pages/PlanPage";
import RecoPage from "./pages/RecoPage";
import Pricing from "./pages/Pricing";
import Legal from "./pages/Legal";
import Results from "./pages/Results";
import Checkout from "./pages/Checkout";
import AfterSales from "./pages/AfterSales";
import SuccessCancel from "./pages/SuccessCancel";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/reco" element={<RecoPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/results" element={<Results />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/aftersales" element={<AfterSales />} />
        <Route path="/success" element={<SuccessCancel />} />
      </Routes>
    </Router>
  );
}

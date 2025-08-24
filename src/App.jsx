import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./design/theme.css";
import "./design/motion.css";
import "./design/hotfix-final.css";
import AppShell from "./components/layout/AppShell.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import RecoPage from "./pages/RecoPage.jsx";
import Results from "./pages/Results.jsx";
import PlanPage from "./pages/PlanPage.jsx";
import Pricing from "./pages/Pricing.jsx";
import Checkout from "./pages/Checkout.jsx";
import AfterSales from "./pages/AfterSales.jsx";
import SuccessCancel from "./pages/SuccessCancel.jsx";
import Legal from "./pages/Legal.jsx";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell/>}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/reco" element={<RecoPage />} />
          <Route path="/results" element={<Results />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/after-sales" element={<AfterSales />} />
          <Route path="/success" element={<SuccessCancel />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/welcome" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

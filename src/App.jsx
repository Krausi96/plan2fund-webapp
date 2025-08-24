import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import RecoPage from "./pages/RecoPage";
import PlanPage from "./pages/PlanPage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  return (
    <div className="app-shell flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/funding" element={<RecoPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

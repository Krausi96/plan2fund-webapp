// src/main.jsx — dynamic, Vercel-safe entry (no hard dev imports)
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const rootEl = document.getElementById("root");
const clean = (p) => (p || "/").replace(/\/+$/, "") || "/";
const path = clean(window.location.pathname);

(async () => {
  if (path === "/dev/visual-check") {
    // Only load the dev screen in development; never block prod builds
    if (import.meta.env.DEV) {
      try {
        const mod = await import("./dev/VisualCheck.jsx");
        const Visual = mod.default || (() => null);
        createRoot(rootEl).render(
          <StrictMode><Visual /></StrictMode>
        );
      } catch {
        createRoot(rootEl).render(
          <StrictMode><div style={{padding:16}}>Dev Visual Check not available.</div></StrictMode>
        );
      }
    } else {
      createRoot(rootEl).render(
        <StrictMode><div style={{padding:16}}>Dev Visual Check is disabled in production.</div></StrictMode>
      );
    }
  } else if (path === "/" || path === "/index.html") {
    // Landing shell first; fall back to LandingPage if shell missing
    try {
      const mod = await import("./shell/LandingShell.jsx");
      const LandingShell = mod.default;
      createRoot(rootEl).render(<StrictMode><LandingShell /></StrictMode>);
    } catch {
      const LandingPage = (await import("./pages/LandingPage.jsx")).default;
      createRoot(rootEl).render(<StrictMode><LandingPage /></StrictMode>);
    }
  } else {
    // App handles inner flow: Landing → Reco → Results → Plan → Export
    const App = (await import("./App.jsx")).default;
    createRoot(rootEl).render(<StrictMode><App /></StrictMode>);
  }
})();

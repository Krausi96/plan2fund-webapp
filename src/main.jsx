import "./design/theme.css";
import "./design/motion.css";
import "./styles.css";

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RuntimeGuard from "./components/RuntimeGuard.jsx";
import App from "./App.jsx";

try { if (location.pathname === "/" || location.pathname === "/index.html") { document.body.setAttribute("data-route","landing"); } } catch {}

const rootEl = document.getElementById("root") || (()=>{ const d=document.createElement("div"); d.id="root"; document.body.appendChild(d); return d; })();
const path = window.location.pathname;

if (path === "/dev/visual-check") {
  import("./dev/VisualCheck.jsx").then(mod => {
    createRoot(rootEl).render(<StrictMode>{React.createElement(mod.default)}</StrictMode>);
  });
} else if (path === "/" || path === "/index.html") {
  import("./shell/LandingShell.jsx").then(mod => {
    createRoot(rootEl).render(<StrictMode>{React.createElement(mod.default)}</StrictMode>);
  });
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <RuntimeGuard>
        <App />
      </RuntimeGuard>
    </StrictMode>
  );
}

import "./lib/gatekeeper.dom.js";
import "./lib/qbank.entry.js";
import "./lib/education.entry.js";

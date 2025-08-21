
import React from "react";
import { createRoot } from "react-dom/client";
import "../design/theme.css";
import "../design/motion.css";
import LandingShell from "./shell/LandingShell.jsx";
if (typeof window !== "undefined" && window.location.pathname === "/") {
  const root = document.getElementById("root") || document.body.appendChild(Object.assign(document.createElement("div"),{id:"root"}));
  createRoot(root).render(<LandingShell />);
}

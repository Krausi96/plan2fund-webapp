import React from "react";
import { createRoot } from "react-dom/client";
import "../design/theme.css";
import "../design/motion.css";

if (typeof window !== "undefined" && window.location.pathname === "/") {
  const root = document.getElementById("root") ||
    document.body.appendChild(Object.assign(document.createElement("div"), { id: "root" }));

  import("./shell/LandingShell.jsx").then((mod) => {
    const LandingShell = mod.default;
    createRoot(root).render(<LandingShell />);
  });
}

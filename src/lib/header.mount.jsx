
import React from "react";
import { createRoot } from "react-dom/client";
import Header from "../components/Header.jsx";
if (typeof window !== "undefined") {
  const p = window.location.pathname;
  if (p !== "/") {
    const mount = document.createElement("div");
    document.body.prepend(mount);
    createRoot(mount).render(<Header />);
  }
}

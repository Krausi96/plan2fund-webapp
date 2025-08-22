import React from "react";
import { createRoot } from "react-dom/client";
import Header from "../components/Header.jsx";
if (typeof window !== "undefined") {
  const p = window.location.pathname;
  if (p !== "/") {
    const m = document.createElement("div");
    document.body.prepend(m);
    createRoot(m).render(<Header />);
  }
}

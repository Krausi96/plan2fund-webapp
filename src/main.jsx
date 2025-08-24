import React from "react";
import { createRoot } from "react-dom/client";
import Welcome from "./pages/Welcome.jsx";
import Reco from "./pages/Reco.jsx";
import Plan from "./pages/Plan.jsx";
import PreviewPricing from "./pages/PreviewPricing.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import Checkout from "./pages/Checkout.jsx";
import Export from "./pages/Export.jsx";
import AfterSales from "./pages/AfterSales.jsx";
import "./design/components.css";
import "./design/motion.css";

const routes = { "/":Welcome,"/index.html":Welcome,"/welcome":Welcome,"/reco":Reco,"/plan":Plan,"/preview":PreviewPricing,"/confirm":Confirmation,"/checkout":Checkout,"/export":Export,"/after":AfterSales };

function mount(){
  const path = window.location.pathname.replace(/\/+$/,"") || "/";
  const Comp = routes[path] || Welcome;
  const rootEl = document.getElementById("root");
  createRoot(rootEl).render(<Comp/>);
}
window.addEventListener("popstate", mount);
document.addEventListener("click", (e)=>{
  const a = e.target.closest && e.target.closest("a[href^='/']");
  if(a && (a.target==="" || a.target==="_self")){
    e.preventDefault(); history.pushState({}, "", a.getAttribute("href")); mount();
  }
});
mount();

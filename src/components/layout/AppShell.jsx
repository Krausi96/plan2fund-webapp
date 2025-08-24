import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { Outlet, useLocation } from "react-router-dom";
import "../../design/theme.css";
import "../../design/motion.css";
import "../../design/hotfix-final.css";

export default function AppShell(){
  const { pathname } = useLocation();
  const onLanding = pathname === "/";
  return (
    <div className="app-shell">
      <Header/>
      {!onLanding && <Breadcrumbs/>}
      <main role="main"><Outlet/></main>
      <Footer/>
    </div>
  );
}

import React from 'react';
import Header from './Header.jsx';
import Breadcrumbs from './Breadcrumbs.jsx';
import Footer from './Footer.jsx';
import '../../design/theme.css';
import '../../design/motion.css';
import { Outlet, useLocation } from 'react-router-dom';

export default function AppShell(){
  const { pathname } = useLocation();
  const onLanding = pathname === '/';
  return (
    <div data-path={pathname}>
      <Header/>                       {/* always visible */}
      {!onLanding && <Breadcrumbs/>}  {/* only off landing */}
      <main role="main"><Outlet/></main>
      <Footer/>                       {/* always visible */}
    </div>
  );
}

import React from "react";

function NavBar() {
  return (
    <nav className="sticky top-0 bg-gray-900/80 backdrop-blur border-b border-gray-800 text-white px-6 py-4 flex justify-between items-center z-50">
      <a href="/" className="text-xl font-bold">Plan2Fund</a>
      <div className="flex gap-6 text-sm font-medium">
        <a href="/plan" className="hover:text-blue-400">Generate Plan</a>
        <a href="/funding" className="hover:text-blue-400">Find Funding</a>
        <a href="/pricing" className="hover:text-blue-400">Pricing</a>
        <a href="/examples" className="hover:text-blue-400">Examples</a>
        <a href="/legal" className="hover:text-blue-400">Legal</a>
      </div>
    </nav>
  );
}

export default NavBar;

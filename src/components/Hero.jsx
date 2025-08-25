import React from "react";

function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-32 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
        Freedom starts with a clear plan —
        <br />
        let’s build yours
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
        Find the right grants in Austria/EU and generate a sharp,
        investor-ready business plan. No spam. No trackers. Just clarity.
      </p>
      <div className="flex gap-4">
        <a href="/funding" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition">
          Find Funding
        </a>
        <a href="/plan" className="px-6 py-3 bg-white text-gray-900 rounded-lg shadow-lg hover:bg-gray-100 transition">
          Generate Plan
        </a>
      </div>
    </section>
  );
}

export default Hero;

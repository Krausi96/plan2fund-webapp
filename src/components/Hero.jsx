import React from "react";

function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
        Freedom starts with a clear plan —
        <br />
        let’s build yours
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
        Find the right grants in Austria/EU and generate a sharp,
        investor-ready business plan. Clean UI, no spam, no trackers.
      </p>
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
          Find Funding
        </button>
        <button className="px-6 py-3 bg-white text-gray-900 rounded-lg shadow hover:bg-gray-100">
          Generate Plan
        </button>
      </div>
    </section>
  );
}

export default Hero;

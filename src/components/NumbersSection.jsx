import React from "react";

export default function NumbersSection() {
  return (
    <section className="section light border-top text-center animate-fly">
      <h2>Global Advantages</h2>
      <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto mt-8">
        <div>
          <strong className="block text-3xl font-bold">500M+</strong>
          <span>Funding opportunities indexed</span>
        </div>
        <div>
          <strong className="block text-3xl font-bold">135+</strong>
          <span>Countries supported</span>
        </div>
      </div>
      <div className="globe-placeholder mt-8">🌍 [Animated Globe Coming]</div>
    </section>
  );
}

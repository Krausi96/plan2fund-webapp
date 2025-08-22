import React from "react";

export default function Products() {
  return (
    <div className="text-center" data-animate="fade-in">
      <h2 className="mb-8">Our Products</h2>
      <div className="product-grid">
        <div className="card">Product A</div>
        <div className="card">Product B</div>
        <div className="card">Product C</div>
      </div>
    </div>
  );
}

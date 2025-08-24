import React from "react";

export default function Products() {
  return (
    <div className="text-center" data-animate="fade-in">
      <h2 className="mb-8">Our Products</h2>
      <div className="product-grid">
        <div className="card">
          <h3>Business Plan Builder</h3>
          <p>Create a baseline plan, add overlays, extend finances up to 24 months.</p>
        </div>
        <div className="card">
          <h3>Preview</h3>
          <p>See eligibility stamp, price tier, timeline. <em>(Checkout disabled)</em></p>
        </div>
        <div className="card">
          <h3>Export</h3>
          <p>DOC & PDF exports. <em>(Disabled for now)</em></p>
        </div>
        <div className="card">
          <h3>After-sales</h3>
          <p>Subscriptions & emails coming soon.</p>
        </div>
      </div>
    </div>
  );
}

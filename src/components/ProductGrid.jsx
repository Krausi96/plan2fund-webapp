import React from "react";
import Product from "./Product";

export default function ProductGrid() {
  // Example product cards, adjust as needed
  const products = [
    { title: "Recommendation Engine", desc: "Tell us your idea, sector, and location. We suggest the top grants and why.", cta: "Start Recommendation" },
    { title: "Business Plan Generator", desc: "Compose an investor-friendly plan with editable blocks and preview.", cta: "Open Generator" },
    { title: "AI Plan Machine (stub)", desc: "Upcoming: automated drafting with your inputs. Disabled for now.", cta: "Coming soon" },
  ];

  return (
    <div className="product-grid">
      {products.map((p, idx) => (
        <Product key={idx} title={p.title} desc={p.desc} cta={p.cta} />
      ))}
    </div>
  );
}

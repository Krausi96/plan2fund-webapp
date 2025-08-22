import React from "react";

export default function Numbers() {
  return (
    <div className="text-center" data-animate="fly-in">
      <h2 className="mb-8">Global Impact</h2>
      <div className="grid grid-cols-2 gap-8">
        <div><strong>500M+</strong><p>Funding database entries</p></div>
        <div><strong>135+</strong><p>Countries supported</p></div>
      </div>
      <div className="globe-placeholder mt-8">?? [Globe Animation Placeholder]</div>
    </div>
  );
}

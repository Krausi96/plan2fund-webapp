import React from "react";

function ProductCard({ title, description, button, disabled }) {
  return (
    <div className="p-6 rounded-2xl bg-gray-800 shadow-lg flex flex-col justify-between">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <button
        disabled={disabled}
        className={`px-5 py-2 rounded-lg font-medium shadow ${
          disabled
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {button}
      </button>
    </div>
  );
}

export default ProductCard;

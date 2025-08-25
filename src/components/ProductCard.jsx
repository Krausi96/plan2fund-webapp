import React from "react";

function ProductCard({ title, description, button, disabled }) {
  return (
    <div className="p-8 rounded-2xl bg-gray-800 hover:bg-gray-700 shadow-lg flex flex-col justify-between transition transform hover:-translate-y-1">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 mb-6 flex-grow">{description}</p>
      <button
        disabled={disabled}
        className={`px-5 py-2 rounded-lg font-medium ${
          disabled
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white shadow"
        }`}
      >
        {button}
      </button>
    </div>
  );
}

export default ProductCard;

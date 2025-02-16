import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  async function handleAddToCart() {
    await addToCart(product._id);
  }
  return (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-lg transition-shadow border-2 border-black"
    >
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4 border-2 border-black">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-sm"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.category}</p>
      <p className="text-lg font-bold text-blue-600">${product.cost}</p>
      <button
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-white hover:border hover:text-black"
        onClick={handleAddToCart}
      >
        Add To Cart
      </button>
    </div>
  );
}

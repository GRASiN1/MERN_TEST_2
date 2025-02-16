import React from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import { useProduct } from "../context/ProductContext";
export default function Home() {
  const {products} = useProduct();
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products && products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import Navbar from "./Navbar";
import CartItem from "./CartItem";

export default function Cart() {
  const { cart, checkOut, fetchCart } = useCart();
  useEffect(() => {
    fetchCart();
  }, [cart]);
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex flex-col gap-4 justify-center items-center">
        {cart && cart.length > 0 && (
          <button
            onClick={checkOut}
            className="bg-black w-1/5 text-white px-4 py-2 rounded-md"
          >
            Checkout
          </button>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {!cart || cart.length === 0 ? (
            <h1 className="text-2xl font-bold">No item in cart</h1>
          ) : (
            cart.map((item) => <CartItem key={item._id} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
}

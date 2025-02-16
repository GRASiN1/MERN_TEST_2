import React, { useCallback, useState } from "react";
import { useCart } from "../context/CartContext";
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item;
  const { updateCart } = useCart();
  const [tempQuantity, setTempQuantity] = useState(quantity);

  const handleUpdateCart = useCallback(
    (productId, quantity) => {
      setTempQuantity(quantity);
      if (quantity === 0) {
        updateCart(productId, quantity);
        return;
      }
      let timeoutId;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        updateCart(productId, quantity);
      }, 1000);
    },
    [updateCart]
  );

  return (
    <div className="flex p-4 gap-4 border border-gray-200 rounded-lg mb-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col flex-1 gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.category}</p>
        <div className="text-lg font-bold text-blue-500 ">
          ₹{product.cost * quantity}
        </div>
        <div className="flex justify-between items-center mt-auto gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleUpdateCart(product._id, tempQuantity - 1)}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md 
                       hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span className="w-8 text-center">{tempQuantity}</span>
            <button
              onClick={() => handleUpdateCart(product._id, tempQuantity + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md 
                       hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <button
            onClick={() => handleUpdateCart(product._id, 0)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 
                     transition-colors duration-200"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

import { createContext, useContext, useState } from "react";
import { api, ENDPOINTS } from "../services/api";

const CartContext = createContext();
const token = localStorage.getItem("token");
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const fetchCart = async () => {
    try {
      const response = await api.get(ENDPOINTS.CART, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(response.data.cartItems);
    } catch (error) {
      alert(error.message);
    }
  };
  const addToCart = async (productId) => {
    try {
      const response = await api.post(
        ENDPOINTS.CART,
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data.cartItems);
      alert("Product added to cart");
    } catch (error) {
      alert(error.message);
    }
  };
  const updateCart = async (productId, quantity) => {
    try {
      const response = await api.put(
        ENDPOINTS.CART,
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        alert("Product removed from cart");
        await fetchCart();
      } else setCart(response.data.cartItems);
    } catch (error) {
      alert(error.message);
    }
  };
  const checkOut = async () => {
    try {
      const response = await api.put(
        ENDPOINTS.CHECKOUT,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        alert("Checkout successful");
        setCart(null);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, fetchCart, updateCart, checkOut }}
    >
      {children}
    </CartContext.Provider>
  );
};
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
export { CartProvider, useCart };

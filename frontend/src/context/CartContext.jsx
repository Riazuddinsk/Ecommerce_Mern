import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setCartCount(0);
      return;
    }

    try {
      const res = await api.get(`/cart/${userId}`);

      const total = res.data?.items?.reduce(
        (sum, item) => sum + item.quantity,
        0
      ) || 0;

      setCartCount(total);

    } catch (error) {
      console.error("Failed to load cart count:", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    refreshCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        refreshCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
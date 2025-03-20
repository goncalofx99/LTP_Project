import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { fetchCart, sendCart } from "../utils/cart.service";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const { data: cartData } = useFetch(fetchCart);

  useEffect(() => {
    if (cartData) {
      setCart(cartData.cart || []);
    }
  }, [cartData]);

  useEffect(() => {
    sendCart(cart);
  }, [cart]);

  const value = {
    cart,
    setCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

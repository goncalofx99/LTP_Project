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

  // cart  functions
  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { product, qty: quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(
      cart.map((item) =>
        item.product.id === productId ? { ...item, qty: newQuantity } : item
      )
    );
  };

  const value = {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

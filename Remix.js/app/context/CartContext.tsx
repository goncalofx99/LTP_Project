import { createContext, useEffect, useState, ReactNode } from "react";
import { fetchCart, sendCart } from "../utils/cart.service";

export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  thumbnail: string;
  images?: string[];
}

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const cartData = await fetchCart();
        if (cartData) {
          setCart(cartData.cart || []);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };

    loadCartData();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      sendCart(cart);
    }
  }, [cart]);

  // Cart functions
  const addToCart = (product: Product, quantity = 1) => {
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

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
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

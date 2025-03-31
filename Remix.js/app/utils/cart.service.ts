/* eslint-disable @typescript-eslint/no-explicit-any */
interface CartItem {
  product: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    [key: string]: any;
  };
  qty: number;
}

interface CartData {
  cart: CartItem[];
  totalQuantity: number;
}

export async function sendCart(cart: CartItem[]): Promise<void> {
  try {
    const response = await fetch(
      "https://ltp-project-f10ec-default-rtdb.firebaseio.com/storeCart.json",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart,
          totalQuantity: cart.length,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to send cart: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error sending cart:", error);
    throw error;
  }
}

export async function fetchCart(): Promise<CartData | null> {
  try {
    const response = await fetch(
      `https://ltp-project-f10ec-default-rtdb.firebaseio.com/storeCart.json`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}

export async function sendCart(Cart) {
  try {
    const response = await fetch(
      "https://ltp-project-f10ec-default-rtdb.firebaseio.com/storeCart.json",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: Cart,
          totalQuantity: Cart.length,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to send cart: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error sending cart:", error);
  }
}

export async function fetchCart() {
  try {
    const response = await fetch(
      `https://ltp-project-f10ec-default-rtdb.firebaseio.com/storeCart.json`
    );

    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

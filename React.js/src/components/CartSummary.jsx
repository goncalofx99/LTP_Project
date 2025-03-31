import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartSummary() {
  const { cart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, cartItem) => acc + cartItem.product.price * cartItem.qty,
    0
  );
  const shipping =
    totalPrice == 0 ? 0 : Math.round(Math.random() * 20 * 100) / 100;

  return (
    <div className="border border-accent rounded-3xl p-6 sm:w-full  font-ubuntu  text-accent sm:my-0  my-5 ">
      <div>
        <h1 className="text-xl font-semibold mb-5">Cart Summary</h1>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-2">
          <p>Subtotal</p>
          <p className="text-right">${totalPrice.toFixed(2)}</p>
        </div>
        <div className="grid grid-cols-2">
          <p>Shipping</p>
          <p className="text-right">${shipping.toFixed(2)}</p>
        </div>
        <div className="grid grid-cols-2">
          <p>Total</p>
          <p className="text-right text-[17px]">
            ${(totalPrice + shipping).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 mt-5 mb-5">
        <button className="bg-accent w-full p-2 text-white font-roboto-mono text-base font-light rounded-lg">
          Checkout
        </button>
        <p>Or pay with Paypal</p>
      </div>
      <div className="flex flex-col border-t pt-4">
        <label className="mb-2">Promo Code</label>
        <div className="flex justify-between">
          <input type="text" className="border p-2 rounded-md w-full mr-5" />
          <button className="bg-accent p-2 text-white font-roboto-mono text-base font-light rounded-lg text-[15px]">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

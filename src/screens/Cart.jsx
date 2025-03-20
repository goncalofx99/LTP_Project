import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mt-10 px-10">
      {cart.length === 0 ? (
        <div className="w-1/2 mx-auto my-auto">
          <h1 className="text-center">No items in your Cart</h1>
        </div>
      ) : (
        <ul className="md:w-9/12 w-full mr-10">
          {" "}
          {cart.map((cartItem) => (
            <CartItem
              key={cartItem.product.id}
              image={cartItem.product.thumbnail}
              title={cartItem.product.title}
              price={cartItem.product.price}
              quantity={cartItem.qty}
              id={cartItem.product.id}
            />
          ))}
        </ul>
      )}
      <div className="md:w-3/12 w-full">
        {" "}
        <CartSummary />
      </div>
    </div>
  );
}

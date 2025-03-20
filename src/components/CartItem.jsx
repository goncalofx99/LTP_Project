import { FiPlus, FiMinus } from "react-icons/fi";
import { PiTrash } from "react-icons/pi";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartItem(props) {
  const { title, image, price, quantity, id } = props;
  const { cart, setCart } = useContext(CartContext);

  const AddQuantity = () => {
    const updatedCart = cart.map((item) =>
      item.product.id == id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updatedCart);
  };

  const reduceQuantity = () => {
    const updatedCart = cart
      .map((item) => {
        if (item.product.id === id) {
          return item.qty > 1 ? { ...item, qty: item.qty - 1 } : null;
        }
        return item;
      })
      .filter((item) => item !== null);

    setCart(updatedCart);
  };

  const removeItem = () => {
    const updatedCart = cart.filter((item) => item.product.id !== id); // Remove the item by id
    setCart(updatedCart);
  };

  return (
    <div className="border-b flex flex-row p-2 font-inter font-bold text-accent">
      <div>
        <img src={image} className="w-40"></img>
      </div>
      <div className="flex justify-between flex-col">
        <div>
          <p className="text-base">{title}</p>
          <p>${price}</p>
        </div>
        <div className="flex flex-row gap-5 items-center ">
          <div className="flex flex-row gap-5 text-[15] items-center border w-min py-1 px-1 rounded-lg">
            <FiMinus onClick={reduceQuantity} />
            <p className="">{quantity}</p>
            <FiPlus onClick={AddQuantity} />
          </div>
          <PiTrash className="w-[24px] h-[24px]" onClick={removeItem} />
        </div>
      </div>
    </div>
  );
}

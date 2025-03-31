import { FiPlus, FiMinus } from "react-icons/fi";
import { PiTrash } from "react-icons/pi";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

interface CartItemProps {
  title: string;
  image: string;
  price: number;
  quantity: number;
  id: number;
}

export default function CartItem(props: CartItemProps) {
  const { title, image, price, quantity, id } = props;
  const cartCtx = useContext(CartContext);

  if (!cartCtx) {
    return <div>Loading...</div>;
  }

  const { updateQuantity, removeFromCart } = cartCtx;

  const addQuantity = () => {
    updateQuantity(id, quantity + 1);
  };

  const reduceQuantity = () => {
    updateQuantity(id, quantity - 1);
  };

  const handleRemoveItem = () => {
    removeFromCart(id);
  };

  return (
    <div className="border-b flex flex-row p-2 font-inter font-bold text-accent">
      <div>
        <img src={image} className="w-40 mr-10" alt={title} />
      </div>
      <div className="flex justify-between flex-col">
        <div>
          <p className="text-base">{title}</p>
          <p>${price}</p>
        </div>
        <div className="flex flex-row gap-5 items-center ">
          <div className="flex flex-row gap-5 text-[15] items-center border w-min py-1 px-1 rounded-lg">
            <FiMinus onClick={reduceQuantity} className="cursor-pointer" />
            <p className="">{quantity}</p>
            <FiPlus onClick={addQuantity} className="cursor-pointer" />
          </div>
          <PiTrash
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={handleRemoveItem}
          />
        </div>
      </div>
    </div>
  );
}

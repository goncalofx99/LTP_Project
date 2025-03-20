import { useParams } from "react-router";
import { getItemDetails } from "../utils/items.service";
import useFetch from "../hooks/useFetch";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

import { useContext } from "react";
export default function ProductDetails() {
  const { cart, setCart } = useContext(CartContext);

  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const cartItem = cart.find((item) => item.product.id == id);

  const { data: productDetails, loading: loadingCategories } = useFetch(() =>
    id ? getItemDetails(id) : null
  );

  const goBack = () => {
    navigate("/");
  };

  const addToCart = () => {
    if (cartItem) {
      const updatedCart = cart.map((item) =>
        item.product.id == id ? { ...item, qty: item.qty + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const newItem = { product: productDetails, qty: 1 };
      setCart([...cart, newItem]);
    }
  };

  return loadingCategories ? (
    <div>
      <h2>Loading Details</h2>
    </div>
  ) : (
    <div>
      <div className="">
        <IoIosArrowBack
          className="w-[24px] h-[24px] cursor-pointer"
          onClick={goBack}
        />
      </div>
      <div className="flex flex-col items-start gap-6 w-full p-10 md:flex-row">
        <div className="w-full md:w-[70%] flex  justify-center ">
          <img
            src={productDetails?.images?.[0] || productDetails?.thumbnail}
            className="w-6/12 h-auto object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-[30%] flex flex-col gap-4">
          <div className="font-ubuntu text-accent text-[28px] font-bold">
            <p>{productDetails.title}</p>
            <p>${productDetails.price}</p>
          </div>

          <button
            className="bg-accent w-full p-2 text-white font-roboto-mono text-base font-light"
            onClick={addToCart}
          >
            {cartItem ? `In cart (${cartItem.qty})` : "Add to Cart"}
          </button>

          <div className="mt-4 font-ubuntu text-base border-t border-accent pt-4">
            <p className="mb-2">Product Details</p>
            <p>{productDetails.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

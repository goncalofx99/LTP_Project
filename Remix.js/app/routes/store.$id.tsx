import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { IoIosArrowBack } from "react-icons/io";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { getItemDetails } from "../utils/items.service";

// Define TypeScript interface for product
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  images?: string[];
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const product = await getItemDetails(id);
    if (!product) {
      throw new Response("Product not found", { status: 404 });
    }
    return json({ product });
  } catch (error) {
    throw new Response("Error loading product", { status: 500 });
  }
};

export default function ProductDetails() {
  const { product } = useLoaderData<{ product: Product }>();
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Find if product is already in cart
  const cartItem = cart.find((item) => item.product.id == product.id);

  const goBack = () => {
    navigate("/");
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div>
      <div className="">
        <IoIosArrowBack
          className="w-[24px] h-[24px] cursor-pointer"
          onClick={goBack}
        />
      </div>
      <div className="flex flex-col items-start gap-6 w-full p-10 md:flex-row">
        <div className="w-full md:w-[70%] flex justify-center">
          <img
            src={product?.images?.[0] || product?.thumbnail}
            className="w-6/12 h-auto object-cover rounded-lg"
            alt={product.title}
          />
        </div>

        <div className="w-full md:w-[30%] flex flex-col gap-4">
          <div className="font-ubuntu text-accent text-[28px] font-bold">
            <p>{product.title}</p>
            <p>${product.price}</p>
          </div>

          <button
            className="bg-accent w-full p-2 text-white font-roboto-mono text-base font-light"
            onClick={handleAddToCart}
          >
            {cartItem ? `In cart (${cartItem.qty})` : "Add to Cart"}
          </button>

          <div className="mt-4 font-ubuntu text-base border-t border-accent pt-4">
            <p className="mb-2">Product Details</p>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

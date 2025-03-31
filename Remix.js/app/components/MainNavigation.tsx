import { Link } from "@remix-run/react";
import { IoIosSearch } from "react-icons/io";
import { FiUser, FiShoppingBag, FiMenu } from "react-icons/fi";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function MainNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const options = ["Home", "Shop", "About", "Contact", "Blog"];
  const cartCtx = useContext(CartContext);

  if (!cartCtx) {
    return <div>Loading...</div>;
  }

  const { cart } = cartCtx;

  return (
    <header className="sm:px-20 px-5 py-4 border-b max-h-screen border-accent text-accent">
      <nav className="flex justify-between items-center mx-auto">
        <div className="text-left">
          <Link to="/">
            <h1 className="font-title text-[32px] leading-[100%] tracking-[6%] cursor-pointer">
              THE ONLINE STORE
            </h1>
          </Link>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-accent"
          >
            <FiMenu className="w-[24px] h-[24px]" />
          </button>
        </div>

        <ul
          className={`lg:flex space-x-6 gap-4 transition-all duration-300 justify-center ${
            isMenuOpen
              ? "flex flex-col items-center absolute bg-white w-full top-16 left-0 z-10"
              : "hidden"
          } lg:static lg:flex-row`}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="text-lg cursor-pointer font-inter font-bold text-accent p-2"
            >
              {option}
            </li>
          ))}

          <div className="flex gap-8 pb-5 flex-row items-center lg:hidden mt-4">
            <IoIosSearch className="w-[18px] h-[18px] cursor-pointer text-accent" />
            <FiUser className="w-[18px] h-[18px] cursor-pointer text-accent" />
            <Link to="/cart">
              <FiShoppingBag className="w-[18px] h-[18px] cursor-pointer text-accent" />
            </Link>
          </div>
        </ul>

        <div className="hidden lg:flex gap-8">
          <IoIosSearch className="w-[22px] h-[22px] cursor-pointer text-accent" />
          <FiUser className="w-[22px] h-[22px] cursor-pointer text-accent" />
          <Link to="/cart" className="relative">
            <FiShoppingBag className="w-[22px] h-[22px] cursor-pointer text-accent" />
            {cart.length > 0 ? (
              <div className="absolute top-[-10px] right-[-10px] bg-accent text-white py-1 px-2 rounded-full text-xs">
                <p>{cart.length}</p>
              </div>
            ) : null}
          </Link>
        </div>
      </nav>
    </header>
  );
}

import { IoIosSearch } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi"; // Menu icon for mobile

export default function MainNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const options = ["Home", "Shop", "About", "Contact", "Blog"];

  return (
    <header className="p-4 border-b max-h-screen border-accent text-accent">
      <nav className="flex justify-between items-center mx-auto">
        {/* Left-aligned Title */}
        <div className="text-left">
          <NavLink to="/">
            <h1 className="font-title text-[32px] leading-[100%] tracking-[6%] cursor-pointer">
              THE ONLINE STORE
            </h1>
          </NavLink>
        </div>

        {/* Hamburger icon (mobile only) */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-accent"
          >
            <FiMenu className="w-[24px] h-[24px]" />
          </button>
        </div>

        {/* Centered Navigation (Desktop) */}
        <ul
          className={`lg:flex space-x-6 transition-all duration-300 justify-center ${
            isMenuOpen
              ? "flex flex-col items-center absolute bg-white w-full top-16 left-0"
              : "hidden"
          } lg:static lg:flex-row`}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="text-lg cursor-pointer font-inter font-light p-2"
            >
              <NavLink to={`/${option.toLowerCase()}`}>{option}</NavLink>
            </li>
          ))}

          {/* Icons for mobile menu */}
          <div className="flex gap-8 pb-5 flex-row items-center lg:hidden mt-4">
            <IoIosSearch className="w-[18px] h-[18px] cursor-pointer text-accent" />
            <FiUser className="w-[18px] h-[18px] cursor-pointer text-accent" />
            <FiShoppingBag className="w-[18px] h-[18px] cursor-pointer text-accent" />
          </div>
        </ul>

        {/* Right-aligned Icons (Desktop) */}
        <div className="hidden lg:flex gap-8">
          <IoIosSearch className="w-[18px] h-[18px] cursor-pointer text-accent" />
          <FiUser className="w-[18px] h-[18px] cursor-pointer text-accent" />
          <FiShoppingBag className="w-[18px] h-[18px] cursor-pointer text-accent" />
        </div>
      </nav>
    </header>
  );
}

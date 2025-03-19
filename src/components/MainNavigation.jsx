import { IoIosSearch } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import { NavLink } from "react-router";
export default function MainNavigation() {
  const options = ["Home", "Shop", "About", "Contact", "Blog"];

  return (
    <header className=" p-4 border-b max-h-screen border-black ">
      <nav className="flex justify-around items-center  mx-auto">
        {/* Left-aligned Title */}
        <div className="text-left">
          <NavLink to="/">
            <h1 className="font-title text-[32px]  leading-[100%] tracking-[6%] cursor-pointer">
              THE ONLINE STORE
            </h1>
          </NavLink>
        </div>

        {/* Centered Navigation */}
        <ul className="flex space-x-6">
          {options.map((option, index) => (
            <li
              key={index}
              className="text-lg cursor-pointer font-inter font-light "
            >
              {option}
            </li>
          ))}
        </ul>
        <div className="flex gap-8 ">
          <IoIosSearch className="w-[18px] h-[18px] cursor-pointer" />
          <FiUser className="w-[18px] h-[18px] cursor-pointer" />
          <FiShoppingBag className="w-[18px] h-[18px] cursor-pointer" />
        </div>
      </nav>
    </header>
  );
}

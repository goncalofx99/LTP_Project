import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";

export default function SortBy() {
  const { sortBy, setSortBy, order, setOrder } = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = ["Sort by", "price", "name", "rating"];

  const handleSort = (option: string) => {
    if (option === "Sort by") {
      setSortBy("Sort by"); // Reset sorting
      setOrder("asc"); // Default order
    } else if (option === sortBy) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(option);
      setOrder("desc");
    }
    setIsOpen(false); // Close dropdown
  };

  return (
    <div>
      <button
        className="border border-gray-300 rounded-md px-4 py-2 bg-white w-40 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {sortBy && sortBy !== "Sort by"
          ? `${sortBy} ${order === "asc" ? "↑" : "↓"}`
          : "Sort by"}
        <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-md">
          {sortOptions.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                sortBy === option ? "font-bold" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() => handleSort(option)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSort(option);
                }
              }}
            >
              {option}{" "}
              {sortBy === option && option !== "Sort by"
                ? order === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

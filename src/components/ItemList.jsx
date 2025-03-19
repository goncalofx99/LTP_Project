import { useState } from "react";
import Pagination from "./Pagination";
import CategorySidebar from "./CategorySideBar";
import { useStore } from "../hooks/useStore";
import ItemCard from "./ItemCard";
import SortBy from "./SortBy";
import Filters from "./Filters"; // Import Filters
import { FiMenu } from "react-icons/fi";

const ItemList = () => {
  const {
    items,
    loading,
    totalItems,
    startItem,
    endItem,
    page,
    handlePageChange,
    itemsPerPage,
    setInputText,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayedItems = items.slice(0, itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    return pageNumbers;
  };

  return (
    <div className="container mx-auto px-4 py-6 font-inter">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="w-full md:w-3/4 mb-6 md:mb-0">
          <div className="flex justify-between  items-center mb-4 p-4">
            <div className="flex justify-between items-center  md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 p-2"
              >
                <FiMenu className="w-[24px] h-[24px]" />
              </button>
            </div>

            <div className="hidden sm:flex flex-row gap-4 flex-wrap">
              <SortBy />
              <input
                placeholder={"Search"}
                className="border-gray-300 border rounded-md w-40 p-2 m-0"
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
              />
            </div>
            <p className="text-gray-600 text-sm">
              Showing {startItem}-{endItem} of {totalItems}
            </p>
          </div>
          {isMobileMenuOpen && (
            <div className="p-4 md:hidden">
              <Filters closeModal={() => setIsMobileMenuOpen(false)} />
            </div>
          )}
          {loading ? (
            <div className="flex justify-center py-8">
              <p>Loading products...</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20">
              {displayedItems.map((product, index) => (
                <li key={product.id || index}>
                  <ItemCard
                    id={product.id}
                    image={product.thumbnail}
                    title={product.title}
                    price={product.price}
                  />
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-end mt-8">
            <Pagination
              page={page}
              totalPages={totalPages}
              handlePageClick={handlePageChange}
              getPageNumbers={getPageNumbers}
            />
          </div>
        </div>

        <div className="hidden md:block">
          <CategorySidebar />
        </div>
      </div>
    </div>
  );
};

export default ItemList;

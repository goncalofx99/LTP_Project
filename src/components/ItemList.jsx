import { useState } from "react";
import Item from "../components/Item";
import Pagination from "./Pagination";
import CategorySidebar from "./CategorySideBar";
import useFetch from "../hooks/useFetch";
import { getItems, getItemsForCategory } from "../utils/items.service";

const ItemList = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const itemsPerPage = 9;

  // Use custom hook for fetching items
  const { data: itemsData, loading: loadingItems } = useFetch(
    () =>
      selectedCategory
        ? getItemsForCategory(selectedCategory)
        : getItems((page - 1) * itemsPerPage),
    [selectedCategory, page]
  );

  const allItems = itemsData?.products || [];
  const totalItems = itemsData?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const displayedItems = allItems.slice(0, itemsPerPage);
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  const handlePageClick = (newPage) => {
    setPage(newPage);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  // Keep this function since your Pagination component expects it as a prop
  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto px-4 py-6 font-inter">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="w-full md:w-3/4 mb-6 md:mb-0">
          <div className="flex justify-between items-center mb-4 p-4">
            <h1 className="text-xl font-bold">Product List</h1>
            <p className="text-gray-600 text-sm">
              Showing {startItem}-{endItem} of {totalItems}
            </p>
          </div>

          {loadingItems ? (
            <div className="flex justify-center py-8">
              <p>Loading products...</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedItems.map((product, index) => (
                <li key={product.id || index}>
                  <Item
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
              handlePageClick={handlePageClick}
              getPageNumbers={getPageNumbers}
            />
          </div>
        </div>

        <CategorySidebar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </div>
  );
};

export default ItemList;

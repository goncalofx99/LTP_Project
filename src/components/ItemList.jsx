import Item from "../components/Item";
import Pagination from "./Pagination";
import CategorySidebar from "./CategorySideBar";
import { useStore } from "../hooks/useStore";
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
          <div className="flex justify-between items-center mb-4 p-4">
            <h1 className="text-xl font-bold">Product List</h1>
            <input
              placeholder={"Search"}
              className="border-gray-300 border rounded-md p-1 w-xl "
              onChange={(e) => {
                setInputText(e.target.value);
              }}
            />
            <p className="text-gray-600 text-sm">
              Showing {startItem}-{endItem} of {totalItems}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <p>Loading products...</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedItems.map((product, index) => (
                <li key={product.id || index}>
                  <Item
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

        <CategorySidebar />
      </div>
    </div>
  );
};

export default ItemList;

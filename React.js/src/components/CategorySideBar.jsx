import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const CategorySidebar = () => {
  const {
    categories,
    loadingCategories,
    selectedCategory,
    handleCategoryChange,
  } = useContext(StoreContext);

  return (
    <div className="w-full text-accent font-inter font-bold">
      <h2 className="t mb-4">Categories</h2>
      {loadingCategories ? (
        <p>Loading categories...</p>
      ) : (
        <form className="border-b border-gray-200 w-full ">
          {categories?.map((category, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="radio"
                id={`category-${index}`}
                name="category"
                className="squared-radio"
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={`category-${index}`}>{category}</label>
            </div>
          ))}
        </form>
      )}
    </div>
  );
};

export default CategorySidebar;

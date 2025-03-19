import useFetch from "../hooks/useFetch";
import { getCategories } from "../utils/items.service";

const CategorySidebar = ({ selectedCategory, onCategoryChange }) => {
  const { data: categories, loading: loadingCategories } = useFetch(
    getCategories,
    []
  );

  return (
    <div className="w-full md:w-1/4 pl-10">
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      {loadingCategories ? (
        <p>Loading categories...</p>
      ) : (
        <form className="border-b border-gray-200">
          {categories?.map((category, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="radio"
                id={`category-${index}`}
                name="category"
                className="squared-radio"
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
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

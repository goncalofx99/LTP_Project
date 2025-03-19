import { createContext, useState } from "react";
import {
  getItems,
  getCategories,
  getItemsForCategory,
  searchItems,
} from "../utils/items.service";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  // Core state
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(9);

  const {
    data: categoryData,
    loading: loadingCategories,
    error: categoryError,
  } = useFetch(getCategories);

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData);
    }
  }, [categoryData]);

  const {
    data: itemData,
    loading: loadingItems,
    error: itemError,
  } = useFetch(
    selectedCategory
      ? () => getItemsForCategory(selectedCategory)
      : () => getItems((page - 1) * itemsPerPage),
    [page, selectedCategory, itemsPerPage]
  );

  useEffect(() => {
    if (itemData) {
      setItems(itemData.products || []);
      setTotalItems(itemData.total || 0);
    }
  }, [itemData]);

  const loadingState = loadingCategories || loadingItems;
  const errorState = categoryError || itemError;

  //search Feature
  const [inputText, setInputText] = useState("");
  const { data: searchItemsData } = useFetch(() => {
    if (inputText) return searchItems(inputText);
    return { products: [], total: 0 }; // Fallback when inputText is empty
  }, [inputText]);

  useEffect(() => {
    if (searchItemsData) {
      setItems(searchItemsData.products || []);
      setTotalItems(searchItemsData.total || 0);
    }
  }, [searchItemsData]);

  const value = {
    items,
    totalItems,
    loading: loadingState,
    error: errorState,
    categories,
    loadingCategories,
    selectedCategory,
    handleCategoryChange: (category) => {
      setSelectedCategory(category);
      setPage(1);
    },
    page,
    itemsPerPage,
    startItem: (page - 1) * itemsPerPage + 1,
    endItem: Math.min(page * itemsPerPage, totalItems),
    handlePageChange: (newPage) => setPage(newPage),
    inputText,
    setInputText: (text) => {
      setInputText(text);
    },
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

import { createContext, useState } from "react";
import {
  getItems,
  getCategories,
  getItemsForCategory,
  searchItems,
  sortItems,
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

  //get categories
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

  //get Items
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

  //search items
  const [inputText, setInputText] = useState(undefined);
  const { data: searchItemsData } = useFetch(() => {
    if (inputText === "") {
      return { products: items, total: totalItems };
    }
    if (inputText) return searchItems(inputText);
    return { products: [], total: 0 };
  }, [inputText]);

  useEffect(() => {
    if (searchItemsData) {
      setItems(searchItemsData.products || []);
      setTotalItems(searchItemsData.total || 0);
    }
  }, [searchItemsData]);

  //sort items
  const [sortBy, setSortBy] = useState(undefined);
  const [order, setOrder] = useState("asc");

  const { data: sortedItems } = useFetch(() => {
    if (sortBy === "Sort by") {
      getItems((page - 1) * itemsPerPage);
    }

    if (sortBy) {
      return sortItems(sortBy, order);
    }
    return { products: [], total: 0 };
  }, [sortBy, order]);

  useEffect(() => {
    if (sortedItems) {
      setItems(sortedItems.products || []);
      setTotalItems(sortedItems.total || 0);
    }
  }, [sortedItems]);

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
    sortBy,
    setSortBy: (sort) => {
      setSortBy(sort);
    },
    order,
    setOrder: (text) => {
      setOrder(text);
    },
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

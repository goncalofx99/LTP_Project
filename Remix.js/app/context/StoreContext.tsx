import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
} from "react";
import {
  getItems,
  getCategories,
  getItemsForCategory,
  searchItems,
  sortItems,
} from "../utils/items.service";

export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  thumbnail: string;
  images?: string[];
}

interface StoreContextType {
  items: Product[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  categories: string[];
  loadingCategories: boolean;
  selectedCategory: string | null;
  handleCategoryChange: (category: string) => void;
  page: number;
  itemsPerPage: number;
  startItem: number;
  endItem: number;
  handlePageChange: (newPage: number) => void;
  inputText: string | undefined;
  setInputText: (text: string) => void;
  sortBy: string | undefined;
  setSortBy: (sort: string) => void;
  order: string;
  setOrder: (order: string) => void;
}

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreContext = createContext<StoreContextType>({
  items: [],
  totalItems: 0,
  loading: false,
  error: null,
  categories: [],
  loadingCategories: false,
  selectedCategory: null,
  handleCategoryChange: () => {},
  page: 1,
  itemsPerPage: 9,
  startItem: 1,
  endItem: 9,
  handlePageChange: () => {},
  inputText: undefined,
  setInputText: () => {},
  sortBy: undefined,
  setSortBy: () => {},
  order: "asc",
  setOrder: () => {},
});

export const StoreProvider = ({ children }: StoreProviderProps) => {
  // Core state
  const [items, setItems] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Loading and error states
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [itemError, setItemError] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(9);

  // Search and sort state
  const [inputText, setInputText] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState("asc");

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true);
      try {
        const categoriesData = await getCategories();
        if (categoriesData) {
          setCategories(categoriesData);
        }
      } catch (error) {
        setCategoryError(
          error instanceof Error ? error.message : "Error loading categories"
        );
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // Load items based on selected category and pagination
  useEffect(() => {
    const loadItems = async () => {
      setLoadingItems(true);
      try {
        let data;
        if (selectedCategory) {
          data = await getItemsForCategory(selectedCategory);
        } else {
          data = await getItems((page - 1) * itemsPerPage);
        }

        if (data) {
          setItems(data.products || []);
          setTotalItems(data.total || 0);
        }
      } catch (error) {
        setItemError(
          error instanceof Error ? error.message : "Error loading items"
        );
      } finally {
        setLoadingItems(false);
      }
    };

    loadItems();
  }, [page, selectedCategory, itemsPerPage]);

  // Handle search
  useEffect(() => {
    const performSearch = async () => {
      if (inputText === undefined) return;

      try {
        setLoadingItems(true);
        if (inputText === "") {
          const data = await getItems((page - 1) * itemsPerPage);
          if (data) {
            setItems(data.products || []);
            setTotalItems(data.total || 0);
          }
        } else {
          const searchData = await searchItems(inputText);
          if (searchData) {
            setItems(searchData.products || []);
            setTotalItems(searchData.total || 0);
          }
        }
      } catch (error) {
        setItemError(
          error instanceof Error ? error.message : "Error searching items"
        );
      } finally {
        setLoadingItems(false);
      }
    };

    performSearch();
  }, [inputText, page, itemsPerPage]);

  // Handle sorting
  useEffect(() => {
    const performSort = async () => {
      if (!sortBy || sortBy === "Sort by") return;

      try {
        setLoadingItems(true);
        const sortedData = await sortItems(sortBy, order);
        if (sortedData) {
          setItems(sortedData.products || []);
          setTotalItems(sortedData.total || 0);
        }
      } catch (error) {
        setItemError(
          error instanceof Error ? error.message : "Error sorting items"
        );
      } finally {
        setLoadingItems(false);
      }
    };

    performSort();
  }, [sortBy, order]);

  const value = {
    items,
    totalItems,
    loading: loadingCategories || loadingItems,
    error: categoryError || itemError,
    categories,
    loadingCategories,
    selectedCategory,
    handleCategoryChange: (category: SetStateAction<string | null>) => {
      setSelectedCategory(category);
      setPage(1);
    },
    page,
    itemsPerPage,
    startItem: (page - 1) * itemsPerPage + 1,
    endItem: Math.min(page * itemsPerPage, totalItems),
    handlePageChange: (newPage: SetStateAction<number>) => setPage(newPage),
    inputText,
    setInputText: (text: SetStateAction<string | undefined>) => {
      setInputText(text);
    },
    sortBy,
    setSortBy: (sort: SetStateAction<string | undefined>) => {
      setSortBy(sort);
    },
    order,
    setOrder: (text: SetStateAction<string>) => {
      setOrder(text);
    },
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

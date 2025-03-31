interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  images?: string[];
}

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function getItems(skip: number): Promise<ProductResponse> {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=9&skip=${skip}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch items: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category-list"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getItemsForCategory(
  category: string
): Promise<ProductResponse> {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch items for category: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching items for category:", error);
    throw error;
  }
}

export async function getItemDetails(id: string): Promise<Product> {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch item details: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching item details:", error);
    throw error;
  }
}

export async function sortItems(
  sortBy: string,
  order: string
): Promise<ProductResponse> {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`
    );

    if (!response.ok) {
      throw new Error(`Failed to sort items: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sorting items:", error);
    throw error;
  }
}

export async function searchItems(query: string): Promise<ProductResponse> {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${query}`
    );

    if (!response.ok) {
      throw new Error(`Failed to search items: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching items:", error);
    throw error;
  }
}

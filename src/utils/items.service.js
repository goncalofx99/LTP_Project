export async function getItems(skip) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=9&skip=${skip}`
    );

    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getCategories() {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category-list"
    );

    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getItemsForCategory(category) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );

    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export function getItemDetails(id) {}

export function sortItems(sortBy, order) {}

export function searchItems(querry) {}

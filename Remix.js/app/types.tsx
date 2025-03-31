export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images?: string[];
  rating?: number;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface CartData {
  cart: CartItem[];
  totalQuantity: number;
}

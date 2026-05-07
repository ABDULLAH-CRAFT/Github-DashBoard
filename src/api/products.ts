//started to change products.js

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const getProducts = async (): Promise<ProductsResponse> => {
  const res = await fetch("https://dummyjson.com/products?limit=20");
  const result = await res.json();
  if (!res.ok) throw new Error("Failed to fetch products");
  return result;
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const result = await res.json();
  if (!res.ok) throw new Error("Failed to fetch product");
  return result;
};
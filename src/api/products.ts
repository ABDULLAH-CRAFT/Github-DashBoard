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

// Pagination + Category Filter API
export const getProducts = async (
  page: number,
  category: string,
  limit: number
): Promise<ProductsResponse> => {
  const skip = (page - 1) * limit;
const url=
category==="All"?`https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("failed to fetch api");
  } else {
    return res.json() 
  }
}

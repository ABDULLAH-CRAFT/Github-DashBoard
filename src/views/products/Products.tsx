// Import React hooks: useEffect for side effects, useState for state management
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Import the API function and Product type from the products API file
import { getProducts, } from "src/api/products";

// Helper function: returns a CSS color class based on the rating value
const getRatingColor = (rating: number) => {
  if (rating >= 4.5) return "text-green-500";  // High rating → green
  if (rating >= 3.5) return "text-yellow-500"; // Medium rating → yellow
  return "text-red-500";                        // Low rating → red
};

// Helper function: returns a label and CSS class based on stock quantity
const getStockBadge = (stock: number) => {
  if (stock > 50) return { label: "In Stock", className: "bg-green-100 text-green-700" };   // Plenty of stock → green
  if (stock > 10) return { label: "Low Stock", className: "bg-yellow-100 text-yellow-700" }; // Running low → yellow
  return { label: "Critical", className: "bg-red-100 text-red-700" };                        // Very low → red
};

// Main Products component
const Products = () => {

  // State: stores the current search input value
  const [search, setSearch] = useState("");

  // State: stores the currently selected category filter, default is "All"
  const [selectedCategory, setSelectedCategory] = useState("All");

  const{data, isLoading,error}=useQuery({queryKey:['products'],queryFn:getProducts, staleTime:1000*60})

 const products = data?.products ?? [];

  // Build a unique list of categories from all products, prepend "All" option
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  // Filter products based on search text AND selected category
  const filtered = products.filter((p) => {
    // Check if product title includes the search text (case-insensitive)
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    console.log("Search value:", search);

    // Check if product matches selected category, or "All" is selected
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;

    // Product must match both conditions
    return matchSearch && matchCategory;
   
  });

  // If data is still loading, show a spinning loader centered on screen
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If there was an error, show the error message
  if (error) {
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        ⚠️ {error.message}
      </div>
    );
  }

  // Main render: show the full products page
  return (
    <div className="p-6">

      {/* Page header section */}
      <div className="mb-6">
        {/* Page title */}
        <h1 className="text-2xl font-bold text-dark dark:text-white">Products</h1>

        {/* Subtitle showing total product count */}
        <p className="text-sm text-gray-500 mt-1">
          Fetched from DummyJSON API — {products.length} total products
        </p>
      </div>

      {/* Stats row: 4 summary cards in a responsive grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          // Each object defines a stat card: label, value, and color
          { label: "Total Products", value: products.length, color: "bg-blue-50 text-blue-600" },
          { label: "Categories", value: categories.length - 1, color: "bg-purple-50 text-purple-600" }, // -1 to exclude "All"
          { label: "Avg Rating", value: (products.reduce((a, b) => a + b.rating, 0) / products.length).toFixed(1), color: "bg-yellow-50 text-yellow-600" }, // Calculate average rating
          { label: "Low Stock", value: products.filter(p => p.stock <= 10).length, color: "bg-red-50 text-red-600" }, // Count products with stock ≤ 10
        ].map((stat) => (
          // Render each stat card
          <div key={stat.label} className={`rounded-xl p-4 ${stat.color}`}>
            <p className="text-2xl font-bold">{stat.value}</p>   {/* Big number */}
            <p className="text-sm mt-1 opacity-80">{stat.label}</p> {/* Label below */}
          </div>
        ))}
      </div>

      {/* Search input and category filter row */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">

        {/* Search input: updates search state on every keystroke */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}                                    // Controlled input
          onChange={(e) => setSearch(e.target.value)}      // Update search state on type
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkgray dark:text-white dark:border-gray-600"
        />

        {/* Category dropdown: updates selectedCategory state on change */}
        <select
          value={selectedCategory}                                      // Controlled select
          onChange={(e) => setSelectedCategory(e.target.value)}        // Update category state
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkgray dark:text-white dark:border-gray-600"
        >
          {/* Render one option per unique category */}
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products table wrapped in rounded bordered container */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto"> {/* Allows horizontal scroll on small screens */}
          <table className="w-full text-sm">

            {/* Table header row */}
            <thead className="bg-gray-50 dark:bg-darkgray text-gray-600 dark:text-gray-300">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold">Category</th>
                <th className="text-left px-4 py-3 font-semibold">Price</th>
                <th className="text-left px-4 py-3 font-semibold">Rating</th>
                <th className="text-left px-4 py-3 font-semibold">Stock</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">

              {/* If no products match the filter, show empty state */}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-400">
                    No products found
                  </td>
                </tr>
              ) : (
                // Otherwise render one row per filtered product
                filtered.map((product) => {
                  // Get stock badge label and color for this product
                  const stockBadge = getStockBadge(product.stock);

                  return (
                    <tr
                      key={product.id} // Unique key for React list rendering
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" // Hover highlight
                    >
                      {/* Product column: thumbnail + title + description */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {/* Product thumbnail image */}
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-10 h-10 rounded-lg object-cover" // Fixed size, rounded, cropped
                          />
                          <div>
                            {/* Product title, truncated to 1 line */}
                            <p className="font-medium text-dark dark:text-white line-clamp-1">
                              {product.title}
                            </p>
                            {/* Product description, truncated to 1 line */}
                            <p className="text-xs text-gray-400 line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category column: pill badge */}
                      <td className="px-4 py-3">
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs capitalize">
                          {product.category}
                        </span>
                      </td>

                      {/* Price column: formatted to 2 decimal places */}
                      <td className="px-4 py-3 font-semibold text-dark dark:text-white">
                        ${product.price.toFixed(2)}
                      </td>

                      {/* Rating column: colored star rating */}
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${getRatingColor(product.rating)}`}>
                          ★ {product.rating} {/* Star icon + rating number, color from helper */}
                        </span>
                      </td>

                      {/* Stock column: colored badge from helper function */}
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockBadge.className}`}>
                          {stockBadge.label} ({product.stock}) {/* Label + actual stock number */}
                        </span>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Export the component for use in routing
export default Products;
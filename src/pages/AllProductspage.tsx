import { useState } from "react";
import products, { type Product } from "../data/products";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const categories = ["all", "sports", "casual", "formal"];

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "all" ||
      p.category.toLowerCase() === selectedCategory;

    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="px-6 max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            All Products
          </h1>
          <p className="mt-2 text-gray-600">
            Explore our premium footwear collection
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white shadow"
                    : "bg-white border text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
              >
                {/* Image */}
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={product.image.trim()}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {product.category}
                  </p>

                  <p className="text-sm text-gray-800 mt-1">
                    Size: {product.size}
                  </p>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No products found.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
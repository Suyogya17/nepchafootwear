// src/pages/AllProductspage.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

type Color = {
  name: string;
  hex: string;
  image: string;
};

type Product = {
  _id: string;
  name: string;
  category: string;
  size: string;
  description: string;
  colors: Color[];
};

const COLOR_HEX: Record<string, string> = {
  Red: '#ef4444', White: '#f9fafb', Blue: '#3b82f6',
  Black: '#111827', Gray: '#6b7280', Navy: '#1e3a5f',
  Brown: '#92400e', Tan: '#d4a96a', Green: '#16a34a',
};

export default function AllProducts() {
  const [products, setProducts]           = useState<Product[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch]               = useState('');
  const navigate = useNavigate();

  const categories = ['all', 'Sports', 'Casual', 'Formal'];

  useEffect(() => {
    productService.getAll()
      .then(setProducts)
      .catch(() => setError('Failed to load products. Is the server running?'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const matchCat  = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 text-lg">Loading products...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  );

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="px-6 max-w-7xl mx-auto">
        <Navigation />
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">All Products</h1>
          <p className="mt-2 text-gray-600">Explore our premium footwear collection</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow'
                    : 'bg-white border text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onClick={() => navigate(`/product/${product._id}`)}
              />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">No products found.</p>
          )}
        </div>   
      </div>
       <Footer  />
    </section>
  );
}

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const [hoveredColor, setHoveredColor] = useState<number>(0);
  const displayImage = product.colors[hoveredColor]?.image
    ? product.colors[hoveredColor].image.startsWith('http')
      ? product.colors[hoveredColor].image
      : `https://nepcha-server.onrender.com${product.colors[hoveredColor].image}` 
    : '';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
    >
      <div className="h-56 w-full overflow-hidden bg-gray-100">
        {displayImage ? (
          <img src={displayImage} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-300 text-sm">
            No image
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-sm text-gray-800 mt-1">Size: {product.size}</p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>

        {/* Color swatches */}
        {product.colors.length > 0 && (
          <div className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color, i) => (
              <button
                key={i}
                title={color.name}
                onMouseEnter={() => setHoveredColor(i)}
                onMouseLeave={() => setHoveredColor(0)}
                className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-125 ${
                  hoveredColor === i ? 'border-orange-500 scale-125' : 'border-gray-300'
                }`}
                style={{ background: color.hex || COLOR_HEX[color.name] || '#ccc' }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
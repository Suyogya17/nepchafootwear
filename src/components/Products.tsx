// src/components/Products.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/api';

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    productService.getAll()
      .then((data) => setProducts(data.slice(0, 3))) // show only 3 on homepage
      .catch((err) => console.error('Failed to load products', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="products" className="py-24 bg-white text-orange-500">
      <div className="px-6 py-12 max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold">Our Products</h1>
          <p className="text-black mt-2">
            Explore our latest collection of high-quality footwear
          </p>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <p className="text-center text-gray-400">Loading products...</p>
        )}

        {/* Product Grid */}
        {!loading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {products.map((product) => {
              const firstImage = product.colors[0]?.image
                ? `https://nepcha-server.onrender.com${product.colors[0].image}`
                : '';

              return (
                <motion.div
                  key={product._id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="cursor-pointer border rounded-2xl p-4 shadow hover:shadow-xl transition bg-white text-black"
                >
                  {/* Image */}
                  {firstImage ? (
                    <img
                      src={firstImage}
                      alt={product.name}
                      className="h-56 w-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="h-56 w-full rounded-xl bg-gray-100 flex items-center justify-center text-gray-300 text-sm">
                      No image
                    </div>
                  )}

                  <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-sm text-gray-900">Size: {product.size}</p>
                  <p className="text-gray-600 mt-2 text-sm">{product.description}</p>

                  {/* Color swatches */}
                  {product.colors.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {product.colors.map((c, i) => (
                        <div
                          key={i}
                          title={c.name}
                          className="w-5 h-5 rounded-full border border-gray-300"
                          style={{ background: c.hex }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <p className="text-center text-gray-400 mt-8">
            No products yet — add some from the admin panel.
          </p>
        )}

        {/* View More Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/products/all')}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-medium"
          >
            View More
          </button>
        </div>
      </div>
    </section>
  );
}
// src/pages/ProductDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { productService } from '../services/api';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

type Color = { name: string; hex: string; image: string };
type Product = {
  _id: string; name: string; category: string;
  size: string; description: string; colors: Color[];
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    productService.getOne(id)
      .then((data) => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 text-lg">Loading...</p>
    </div>
  );

  if (!product) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-500 text-lg">Product not found.</p>
    </div>
  );

  const color = product.colors[selectedColor];
  const imageUrl = color?.image;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Navigation />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-28 pb-16 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        
        {/* Product Image */}
        <div className="overflow-hidden rounded-3xl shadow-lg aspect-[4/5] bg-gray-100 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={imageUrl}
              src={imageUrl}
              alt={`${product.name} in ${color?.name}`}
              className="w-full h-full object-contain"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        </div>

        {/* Product Details */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1"
          >
            ← Back
          </button>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{product.name}</h1>
          <p className="text-orange-500 font-medium mt-2 text-lg">{product.category}</p>
          <p className="mt-6 text-gray-700 leading-relaxed">{product.description}</p>
          {product.size && (
            <p className="mt-4 text-gray-800 font-semibold">
              Size: <span className="font-normal">{product.size}</span>
            </p>
          )}

          {/* Color Selector */}
          {product.colors.length > 0 && (
            <div className="mt-6">
              <p className="text-gray-800 font-semibold mb-3">
                Color: <span className="font-normal text-gray-600">{color?.name}</span>
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    title={c.name}
                    className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                      selectedColor === i
                        ? 'border-orange-500 ring-2 ring-orange-300 scale-110'
                        : 'border-gray-300'
                    }`}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </main>
      {/* Footer */}
          <Footer />
        
    </div>
  );
}
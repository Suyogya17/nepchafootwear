// src/pages/ProductDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { productService } from '../services/api';

type Color = { name: string; hex: string; image: string };
type Product = {
  _id: string; name: string; category: string;
  size: string; description: string; colors: Color[];
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct]           = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    if (!id) return;
    productService.getOne(id)
      .then((data) => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Loading...</p>
    </div>
  );

  if (!product) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-500">Product not found.</p>
    </div>
  );

  const color = product.colors[selectedColor];
  const imageUrl = color?.image ? `http://localhost:3000${color.image}` : '';

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Image with animation on color change */}
        <div className="overflow-hidden rounded-3xl shadow-lg aspect-square bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.img
              key={imageUrl}
              src={imageUrl}
              alt={`${product.name} in ${color?.name}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        </div>

        {/* Details */}
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

          {/* Color selector */}
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
                    className={`w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 ${
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

          <button className="mt-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition w-full md:w-auto">
            Add to Cart
          </button>
        </motion.div>
      </div>
    </section>
  );
}
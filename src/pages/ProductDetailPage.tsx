import { useParams } from "react-router-dom";
import products from "../data/products";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold text-xl">
        Product not found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Product Image */}
        <motion.div 
          className="overflow-hidden rounded-3xl shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            {product.name}
          </h1>

          <p className="text-indigo-600 font-medium mt-2">{product.category}</p>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* Dynamic Product Details */}
          {product.size && (
            <p className="mt-4 text-gray-800 font-semibold">
              Size: {product.size}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
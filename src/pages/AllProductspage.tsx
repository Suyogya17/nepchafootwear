import products, { type Product } from "../data/products";
import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AllProducts() {
  // const navigate = useNavigate();

  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="px-6 max-w-7xl mx-auto">

        {/* Back Button */}
        {/* <button
          onClick={() => navigate("/")}
          className="mb-6 text-orange-500 hover:underline"
        >
        
        </button> */}

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">All Products</h1>
          <p className="mt-2 text-gray-600">
            Explore our complete range of high-quality footwear.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product: Product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="border rounded-2xl p-4 shadow hover:shadow-xl transition bg-white text-black"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover rounded-xl"
              />
              <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.category}</p>
               <p className="text-sm text-gray-900">Size: {product.size}</p>
              <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
              <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                Request Quote
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
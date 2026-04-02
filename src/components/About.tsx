import logo from '../assets/nepcha.png';
import { motion } from 'framer-motion';
import dealers from '../data/dealers';

type dealers = {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
};

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* HEADER */}
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 text-center ">
            Built for Dealers.
            {/* <br /> */}
            <span className="text-orange-500">Driven by Quality.</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Nepcha International Industry Pvt Ltd started as a small footwear
            manufacturer with a vision to empower local retailers and distributors
            across Nepal. Today, we produce high-quality, stylish, and durable
            footwear collections designed specifically for the B2B market.
          </p>

          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Our mission is to support our partners in growing their businesses by
            providing products that sell well, ensuring consistency, reliability,
            and competitive pricing. We help dealers, wholesalers, and retail chains
            by delivering footwear that their customers trust and love.
          </p>
        </div>

        {/* STORY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          {/* LEFT VISUAL */}
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border-2 border-gray-200 flex items-center justify-center">
            <img
              src={logo}
              alt="Nepcha Footwear"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* RIGHT TEXT */}
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-gray-900">
              Our Vision & Approach
            </h3>

            <p className="text-gray-600 leading-relaxed">
              At Nepcha, we don’t compete with our partners we empower them. 
              We operate strictly as a B2B manufacturer, ensuring every product 
              we create is tailored for resale success rather than direct-to-consumer competition.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our vision is to become Nepal’s most trusted B2B footwear provider,
              helping dealers scale confidently by offering collections that combine
              durability, style, and affordability.
            </p>

            <p className="text-gray-600 leading-relaxed">
              From sourcing premium materials to delivering finished products on time, 
              our approach focuses on quality, consistency, and scalability, ensuring
              a reliable supply chain for all our partners.
            </p>
          </div>
        </div>

        {/* MINIMAL VALUES */}
        <div className="grid md:grid-cols-3 gap-12 mb-32 text-center lg:text-left">
          <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Dealer First</h4>
            <p className="text-gray-600">
              Every product is designed to help our partners sell more efficiently and grow their businesses.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Scalable Production</h4>
            <p className="text-gray-600">
              We offer bulk manufacturing with consistent quality and timely delivery, so dealers never run out of stock.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Trusted Quality</h4>
            <p className="text-gray-600">
              Every shoe is crafted from premium materials with careful attention to durability and finish.
            </p>
          </div>
        </div>

     {/* OUR DEALERS */}
<div className="mb-32">
  <h3 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Dealers Across Provinces</h3>

  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {dealers.map((dealer, index) => (
      <motion.div
        key={dealer.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
      >
        {/* Dealer Logo */}
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
          <img
            src={dealer.logo}
            alt={dealer.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Dealer Info */}
        <div className="p-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">{dealer.name}</h4>
          <p className="text-gray-600 mb-1"><span className="font-medium">Proprietor:</span> {dealer.proprietor}</p>
          <p className="text-gray-600 mb-1"><span className="font-medium">Address:</span> {dealer.address}</p>
          <p className="text-gray-600 mb-2"><span className="font-medium">Contact:</span> {dealer.contact}</p>
          <a 
            href={dealer.mapLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-500 font-medium hover:underline"
          >
            View on Map
          </a>
        </div>
      </motion.div>
    ))}
  </div>
</div>
      </div>
    </section>
  );
}
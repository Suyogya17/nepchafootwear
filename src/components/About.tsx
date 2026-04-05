import { useEffect, useState } from "react";
import logo from "../assets/nepcha.png";
import { motion } from "framer-motion";
import dealers from "../data/dealers";

/* -------------------- BANNER CAROUSEL -------------------- */
function BannerCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, paused]);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Images */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          className={`absolute w-full h-full object-cover transition-all duration-1000 ${
            i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <h2 className="text-white text-3xl md:text-5xl font-bold">
          Elevating Footwear for Every Dealer
        </h2>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur"
      >     
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur"
      >
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------- ABOUT PAGE -------------------- */
export default function About() {
  const banners = [
    "https://i.pinimg.com/originals/eb/1a/7f/eb1a7f37ec4f9a29eef48f513c6a3c0f.gif",
    "https://i.pinimg.com/1200x/f6/70/e0/f670e036d26c7a32d33c76ce8a7895c7.jpg",
    "https://i.pinimg.com/1200x/28/e4/63/28e4634b5ec88dfbac78dbd9cc0fca0e.jpg",
  ];

  return (
    <section id="about" className="bg-white">

      {/* -------- CONTENT CONTAINER -------- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        
        {/* HEADER */}
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            Built for Dealers.
            <span className="text-orange-500"> Driven by Quality.</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Nepcha International Industry Pvt Ltd started as a small footwear
            manufacturer with a vision to empower local retailers across Nepal.
          </p>
        </div>

        {/* STORY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border-2 border-gray-200">
            <img
              src={logo}
              alt="Nepcha"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-gray-900 text-center lg:text-left">
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

        {/* VALUES */}
        <div className="grid md:grid-cols-3 gap-12 mb-32">
          <div className="p-6 border rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">Dealer First</h4>
            <p className="text-gray-600 text-sm">
                Every product is designed to help our partners sell more efficiently and grow their businesses.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">
              Scalable Production
            </h4>
            <p className="text-gray-600 text-sm">
               We offer bulk manufacturing with consistent quality and timely delivery, so dealers never run out of stock.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">
              Trusted Quality
            </h4>
            <p className="text-gray-600 text-sm">
               Every shoe is crafted from premium materials with careful attention to durability and finish.
            </p>
          </div>
        </div>

      </div>

      {/* 🔥 FULL WIDTH BANNER (OUTSIDE CONTAINER) */}
      <div className="w-full mb-26">
        <BannerCarousel images={banners} />
      </div>

      {/* -------- DEALERS CONTAINER AGAIN -------- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <h3 className="text-4xl font-bold text-center mb-10">
          Our Dealers Across Provinces
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {dealers.map((dealer, index) => (
            <motion.div
              key={dealer.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="border rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={dealer.logo}
                alt={dealer.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-4">
                <h4 className="font-semibold text-gray-900">
                  {dealer.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {dealer.address}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
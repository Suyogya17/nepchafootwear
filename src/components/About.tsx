import { useEffect, useState } from "react";
import logo from "/shoesimg/nepcha.png";
import { motion } from "framer-motion";
import { TrendingUp, Factory, ShieldCheck } from "lucide-react";
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
          alt="banner"
          className={`absolute w-full h-full object-cover transition-all duration-1000 ${
            i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

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
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur"
      >
        ❯
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

  const values = [
    {
      title: "Dealer First",
      desc: "Every product is designed to help partners sell more and grow faster.",
      icon: <TrendingUp />,
    },
    {
      title: "Scalable Production",
      desc: "Bulk manufacturing with consistency and timely delivery.",
      icon: <Factory />,
    },
    {
      title: "Trusted Quality",
      desc: "Premium materials with durability and finishing excellence.",
      icon: <ShieldCheck />,
    },
  ];

  return (
    <section id="about" className="bg-white">

      {/* -------- CONTENT -------- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">

        {/* HEADER */}
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            Built for Dealers.
            <span className="text-orange-500"> Driven by Quality.</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Nepcha International Industry Pvt Ltd started as a small footwear manufacturer with a vision to empower retailers.
          </p>
        </div>

        {/* STORY */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative h-[400px] rounded-3xl overflow-hidden border"
          >
            <img src={logo} alt="Nepcha" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
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
          </motion.div>
        </div>

        {/* 🔥 MODERN VALUES */}
        <div className="grid md:grid-cols-3 gap-10 mb-32">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative p-8 rounded-2xl bg-white border shadow-sm hover:shadow-xl transition overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-orange-100 opacity-0 group-hover:opacity-30 transition"></div>

              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-orange-100 text-orange-500 mb-4">
                {v.icon}
              </div>

              <h4 className="text-xl font-semibold mb-2">{v.title}</h4>
              <p className="text-gray-600 text-sm">{v.desc}</p>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-500 group-hover:w-full transition-all"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BANNER */}
      <div className="w-full mb-24">
        <BannerCarousel images={banners} />
      </div>

      {/* DEALERS */}
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
      transition={{ delay: index * 0.15 }}
      whileHover={{ scale: 1.05 }}
      className="border rounded-2xl overflow-hidden hover:shadow-xl transition bg-white"
    >
      {/* IMAGE */}
      <img
        src={dealer.logo}
        alt={dealer.name}
        className="w-full h-56 object-cover"
      />

      {/* CONTENT */}
      <div className="p-5 space-y-2">
        <h4 className="font-semibold text-lg text-gray-900">
          {dealer.name}
        </h4>

        <p className="text-sm text-gray-600">
          {dealer.address}
        </p>

        {/* CONTACT */}
        <a
          href={`tel:${dealer.contact}`}
          className="block text-sm font-medium text-orange-500 hover:underline"
        >
          📞 {dealer.contact}
        </a>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 mt-3">
          {/* CALL */}
          <a
            href={`tel:${dealer.contact}`}
            className="flex-1 text-center bg-orange-500 text-white py-2 rounded-lg text-sm hover:bg-orange-600 transition"
          >
            Call
          </a>

          {/* MAP */}
          <a
            href={dealer.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center border py-2 rounded-lg text-sm hover:bg-gray-100 transition"
          >
            View Map
          </a>
        </div>
      </div>
    </motion.div>
  ))}
</div>
      </div>

    </section>
  );
}
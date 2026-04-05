import  { useState, useEffect } from "react";
import { ArrowRight, Factory, Sparkles } from "lucide-react";

// Sample carousel images (replace with your own images)
const heroImages = [
  "https://i.pinimg.com/1200x/a6/ff/fc/a6fffcbfd239ad8dac3267b99b7ceb0e.jpg",
  "https://i.pinimg.com/736x/6d/85/c2/6d85c2706240d283f0698042420edc90.jpg",
  "http://i.pinimg.com/1200x/45/90/cf/4590cfd06276d798b51440a4097f4e16.jpg",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Carousel */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 flex flex-col items-center text-center">
        {/* Logo / Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-4">
            <Factory className="w-12 h-12 text-white" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          Premium Footwear
          <br />
          <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Crafted for Businesses
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mt-6 leading-relaxed">
          Nepcha International Industry Pvt Ltd delivers high-quality,
          durable, and stylish footwear for wholesalers and
          distributors across Nepal and beyond. Partner with us for reliable supply and
          exceptional service.

        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <button
            onClick={() => scrollToSection("products")}
            className="group bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-700 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            Become a Dealer
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div>
            <div className="text-3xl font-bold text-white">10+</div>
            <div className="text-white">Our Dealers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">70000+</div>
            <div className="text-white">Pairs Produced Monthly</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">10+</div>
            <div className="text-white">Years of Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Mail, Phone, ArrowUp } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-orange-500 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-white">Nepcha International</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Nepal’s trusted B2B footwear manufacturer, empowering dealers and wholesalers 
              with high-quality, stylish, and durable footwear collections. We help businesses grow 
              with reliable and scalable supply.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300 hover:text-black transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@nepcha.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 hover:text-black transition-colors">
                <Phone className="w-4 h-4" />
                <span>(+977 9801234567)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['about', 'products', 'dealers', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="text-gray-300 hover:text-black transition-colors duration-200"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Offerings */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Offerings</h3>
            <ul className="space-y-2">
              {['B2B Footwear Supply','Bulk Manufacturing','Custom Orders','Dealer Support','Wholesale Pricing'].map((service) => (
                <li key={service} className="text-gray-300 hover:text-black transition-colors">{service}</li>
              ))}   
            </ul>           
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div className="text-gray-300 text-sm text-center md:text-left">
            © 2026 Nepcha International. All rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            {/* Social Icons */}
            {[{
              icon: FaTwitter, 
              href: "#"
            },{
              icon: FaInstagram, 
              href: "#"
            },{
              icon: FaLinkedin, 
              href: "#"
            }].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-black transition-all duration-300 hover:scale-110"
              >     
                <social.icon size={18} className="text-white" />
              </a>
            ))}

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white hover:from-orange-600 hover:to-orange-500 hover:scale-110 transition-all duration-300"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
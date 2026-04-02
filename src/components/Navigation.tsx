import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(
    null
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    {
      label: "Products",
      id: "products",
      submenu: [
        { label: "Men", id: "products-men" },
        { label: "Women", id: "products-women" },
        { label: "Kids", id: "products-kids" },
        { label: "New Arrivals", id: "products-new" },
      ],
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200"
          : "bg-orange-100/90 backdrop-blur-md"
      } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <div
            className="cursor-pointer font-bold text-xl"
            onClick={() => scrollToSection("hero")}
          >
            <span className={isScrolled ? "text-black" : "text-black"}>
              Nepcha
            </span>{" "}
            <span className="text-orange-500">Footwear</span>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.submenu ? (
                <div key={item.id} className="relative group">
                  <button
                    className={`font-medium flex items-center transition ${
                      isScrolled
                        ? "text-black hover:text-orange-500"
                        : "text-black hover:text-orange-400"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>

                  {/* DESKTOP DROPDOWN */}
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                    {item.submenu.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => scrollToSection(sub.id)}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-orange-50 hover:text-orange-500 transition"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium transition ${
                    isScrolled
                      ? "text-gray-800 hover:text-orange-500"
                      : "text-black hover:text-orange-400"
                  }`}
                >
                  {item.label}
                </button>
              )
            )}

            <button
              onClick={() => scrollToSection("contact")}
              className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Become a Dealer
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isScrolled ? "text-black" : "text-white"}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-lg mt-2 p-4 space-y-2 shadow-lg">
            {navItems.map((item) =>
              item.submenu ? (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() =>
                      setMobileSubmenuOpen(
                        mobileSubmenuOpen === item.id ? null : item.id
                      )
                    }
                    className="w-full flex justify-between items-center text-gray-800 font-medium px-2 py-2 hover:text-orange-500 transition"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileSubmenuOpen === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileSubmenuOpen === item.id && (
                    <div className="pl-4 space-y-1">
                      {item.submenu.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => scrollToSection(sub.id)}
                          className="block w-full text-left text-gray-600 hover:text-orange-500 transition px-2 py-1"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-gray-800 hover:text-orange-500 transition px-2 py-2"
                >
                  {item.label}
                </button>
              )
            )}

            <button
              onClick={() => scrollToSection("contact")}
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg mt-2"
            >
              Become a Dealer
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
import React, { useState, useEffect, useRef } from "react";
import { Hero } from "../components/Hero.jsx";
import { ProductCard } from "../components/ProductCard.jsx";
import { FaStar, FaHistory, FaSearch, FaChevronDown, FaTools, FaAngleRight } from "react-icons/fa";
import { ALL_TOOLS } from "../config/tools.jsx";

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAnimating, setIsAnimating] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [recents, setRecents] = useState([]);
  const dropdownRef = useRef(null);

  // Dynamic products mapped from ALL_TOOLS registry
  const products = ALL_TOOLS.map((tool, index) => ({
    id: index + 1,
    title: tool.title,
    link: tool.path,
    category: tool.category,
    icon: tool.icon,
    desc: tool.desc
  }));

  // Load favorites & recents on mount and sync on changes
  const loadDashboardData = () => {
    const savedFavs = JSON.parse(localStorage.getItem("favoriteTools") || "[]");
    const savedRecents = JSON.parse(localStorage.getItem("recentTools") || "[]");
    setFavorites(savedFavs);
    setRecents(savedRecents);
  };

  useEffect(() => {
    loadDashboardData();
    // Listen to storage events (cross tab/window sync)
    window.addEventListener("storage", loadDashboardData);
    return () => window.removeEventListener("storage", loadDashboardData);
  }, []);

  const handleFavoriteToggle = (toolId, isFav) => {
    // Reload state immediately
    const savedFavs = JSON.parse(localStorage.getItem("favoriteTools") || "[]");
    setFavorites(savedFavs);
  };

  // Get unique categories for filter
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Handle category change with animation
  const handleCategoryChange = (newCategory) => {
    if (newCategory !== selectedCategory) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedCategory(newCategory);
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 150);
    }
  };

  // Trigger command palette manually (emit Ctrl+K key event)
  const triggerSearchPalette = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter list of favorite and recent products
  const favoriteProducts = products.filter(p => favorites.includes(p.link.split("/").pop()));
  const recentProducts = products.filter(p => recents.includes(p.link.split("/").pop())).slice(0, 3);

  return (
    <>
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Dynamic Personal Dashboard Section */}
        {(favoriteProducts.length > 0 || recentProducts.length > 0) && (
          <div className="mb-16 border-b border-slate-200 pb-12">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 font-brand">
              <FaTools className="text-[var(--accent-color)] w-4 h-4" />
              Your Workspace Dashboard
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Starred Favorites Block */}
              {favoriteProducts.length > 0 && (
                <div className="bg-slate-100/50 rounded-2xl p-6 border border-slate-200/60 flex flex-col">
                  <h4 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2 font-brand">
                    <FaStar className="text-yellow-500 w-3.5 h-3.5" />
                    Pinned Favorites ({favoriteProducts.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                    {favoriteProducts.map(product => (
                      <ProductCard
                        key={`fav-${product.id}`}
                        title={product.title}
                        link={product.link}
                        category={product.category}
                        icon={product.icon}
                        desc={product.desc}
                        isFavInitially={true}
                        onToggleFav={handleFavoriteToggle}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Recently Visited Block */}
              {recentProducts.length > 0 && (
                <div className="bg-slate-100/50 rounded-2xl p-6 border border-slate-200/60 flex flex-col">
                  <h4 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2 font-brand">
                    <FaHistory className="text-blue-500 w-3.5 h-3.5" />
                    Recently Used
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                    {recentProducts.map(product => (
                      <ProductCard
                        key={`rec-${product.id}`}
                        title={product.title}
                        link={product.link}
                        category={product.category}
                        icon={product.icon}
                        desc={product.desc}
                        isFavInitially={favorites.includes(product.link.split("/").pop())}
                        onToggleFav={handleFavoriteToggle}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categories Section Header with Filter */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-brand">
            Tool Directory
            <span className="text-xs text-slate-500 ml-2 block sm:inline font-normal">
              ({filteredProducts.length} {filteredProducts.length === 1 ? "utility" : "utilities"} listed)
            </span>
          </h2>

          {/* Desktop Categories Segment Tabs */}
          <div className="hidden lg:flex bg-slate-200/60 p-1 rounded-xl border border-slate-300/40 select-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Fallback Mobile Filter Dropdown */}
          <div className="relative w-full sm:w-60 lg:hidden" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-slate-900 text-white px-4 py-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between w-full text-xs font-semibold"
            >
              <span>{selectedCategory}</span>
              <FaChevronDown
                className={`w-3.5 h-3.5 ml-2 transform transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 mt-1.5 w-full bg-slate-900 rounded-xl shadow-lg border border-slate-800 overflow-hidden py-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      handleCategoryChange(category);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors ${
                      selectedCategory === category
                        ? "bg-slate-800 text-white font-semibold"
                        : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center transition-all duration-300 ${
            isAnimating ? "opacity-0 scale-98" : "opacity-100 scale-100"
          }`}
        >
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`transform transition-all duration-300 ${
                isAnimating
                  ? "opacity-0 translate-y-2"
                  : "opacity-100 translate-y-0"
              }`}
              style={{
                transitionDelay: isAnimating ? "0ms" : `${index * 30}ms`,
              }}
            >
              <ProductCard
                title={product.title}
                link={product.link}
                category={product.category}
                icon={product.icon}
                desc={product.desc}
                isFavInitially={favorites.includes(product.link.split("/").pop())}
                onToggleFav={handleFavoriteToggle}
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
            <p className="text-slate-400 text-sm font-medium">
              No developer tools found in this category.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

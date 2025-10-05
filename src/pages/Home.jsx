import React, { useState, useEffect, useRef } from "react";
import { Hero } from "../components/Hero.jsx";
import { ProductCard } from "../components/ProductCard.jsx";

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAnimating, setIsAnimating] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  // Products data array
  const products = [
    // Data Tools
    {
      id: 1,
      title: "JSON Formatter",
      link: "/tools/json-formatter",
      category: "Data Tools",
    },
    {
      id: 2,
      title: "Base64 Encoder/Decoder",
      link: "/tools/base64",
      category: "Data Tools",
    },
    {
      id: 3,
      title: "UUID Generator",
      link: "/tools/uuid",
      category: "Data Tools",
    },
    {
      id: 4,
      title: "Regex Tester",
      link: "/tools/regex",
      category: "Data Tools",
    },
    { id: 5, title: "JWT Decoder", link: "/tools/jwt", category: "Data Tools" },
    {
      id: 6,
      title: "Cron Expression Tester",
      link: "/tools/cron",
      category: "Data Tools",
    },

    // Code Generators
    {
      id: 7,
      title: "Code Snippet Generator",
      link: "/tools/snippet-generator",
      category: "Code Generators",
    },
    {
      id: 8,
      title: "Dockerfile Generator",
      link: "/tools/dockerfile",
      category: "Code Generators",
    },
    {
      id: 9,
      title: ".gitignore Generator",
      link: "/tools/gitignore",
      category: "Code Generators",
    },
    {
      id: 10,
      title: "CSS Gradient Generator",
      link: "/tools/css-gradient",
      category: "Code Generators",
    },
    {
      id: 11,
      title: "CSS Animation Generator",
      link: "/tools/css-animation",
      category: "Code Generators",
    },
    {
      id: 12,
      title: "Tailwind Visualizer",
      link: "/tools/tailwind-visualizer",
      category: "Code Generators",
    },

    // UI/Frontend Tools
    {
      id: 13,
      title: "Color Palette Generator",
      link: "/tools/color-palette",
      category: "UI/Frontend Tools",
    },
    {
      id: 14,
      title: "Markdown to HTML",
      link: "/tools/markdown-html",
      category: "UI/Frontend Tools",
    },
    {
      id: 15,
      title: "Responsive Design Tester",
      link: "/tools/responsive-tester",
      category: "UI/Frontend Tools",
    },
    {
      id: 16,
      title: "SVG to JSX Converter",
      link: "/tools/svg-jsx",
      category: "UI/Frontend Tools",
    },
    {
      id: 17,
      title: "Icon Library",
      link: "/tools/icons",
      category: "UI/Frontend Tools",
    },

    // Productivity Tools
    {
      id: 18,
      title: "Timezone Converter",
      link: "/tools/timezone",
      category: "Productivity Tools",
    },
  ];
  // Get unique categories for filter dropdown
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

      // Fade out current products
      setTimeout(() => {
        setSelectedCategory(newCategory);

        // Fade in new products
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 150);
    }
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

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        {/* Header with Filter */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--primary-color)]">
            Developer Tools
            <span className="text-lg text-[var(--accent-color)] ml-2 transition-all duration-300">
              ({filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "tool" : "tools"})
            </span>
          </h2>

          {/* Filter Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-gray-700 text-white px-3 py-2 rounded-md cursor-pointer transition-all duration-200 flex items-center justify-between min-w-[160px]"
            >
              {selectedCategory}
              <svg
                className={`w-4 h-4 ml-2 transform transition-transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-gray-700 rounded-md shadow-lg border border-gray-600">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      handleCategoryChange(category);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-white hover:bg-[var(--accent-color)] transition-colors first:rounded-t-md last:rounded-b-md ${
                      selectedCategory === category
                        ? "bg-[var(--accent-color)]"
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
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center transition-all duration-300 ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`transform transition-all duration-300 ${
                isAnimating
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
              style={{
                transitionDelay: isAnimating ? "0ms" : `${index * 50}ms`,
              }}
            >
              <ProductCard
                title={product.title}
                link={product.link}
                category={product.category}
              />
            </div>
          ))}
        </div>

        {/* No products message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No tools found in this category.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

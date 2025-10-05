import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // for nested dropdown
  const dropdownRef = useRef(null);

  // close dropdown on outside click (only for desktop)
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Only handle outside clicks for desktop dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !isOpen
      ) {
        setDropdownOpen(false);
        setActiveCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // services data
  const services = {
    "Data Tools": [
      "JSON formatter",
      "Base64",
      "UUID",
      "Regex",
      "JWT",
      "Cron tester",
    ],
    Coding: [
      "Snippet generator",
      "Dockerfile & .gitignore templates",
      "CSS gradient/animation generator",
      "Tailwind visualizer",
    ],
    "UI Tools": [
      "Color palette",
      "Markdown → HTML",
      "Responsive tester",
      "SVG → JSX",
      "Icon library",
    ],
    Productivity: ["Timezone converter", "Code diff checker", "Git cheatsheet"],
  };
  return (
    <>
      <nav className="bg-[var(--primary-color)] rounded-xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <a className="flex items-center" href="/">
              <img className="h-8 w-8 mr-2" src={Logo} alt="Logo" />
              <span className="text-white font-bold text-lg">DevTools</span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="/"
                className="text-[var(--accent-color)] hover:text-[var(--accent-color)]"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[var(--accent-color)]"
              >
                About
              </a>

              {/* Category dropdowns */}
              {Object.keys(services).map((category) => (
                <div key={category} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === category ? null : category
                      )
                    }
                    className="flex items-center text-gray-300 hover:text-[var(--accent-color)]"
                  >
                    {category}
                    <svg
                      className={`w-4 h-4 ml-1 transform transition-transform ${
                        activeCategory === category ? "rotate-180" : "rotate-0"
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

                  {activeCategory === category && (
                    <div className="absolute z-20 mt-2 w-56 bg-gray-700 rounded-md shadow-lg">
                      {services[category].map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block px-4 py-2 text-gray-200 hover:bg-gray-600 first:rounded-t-md last:rounded-b-md"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <a
                href="/contact"
                className="text-gray-300 hover:text-[var(--accent-color)]"
              >
                Contact
              </a>
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center space-x-4"></div>

            {/* Mobile button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-[var(--accent-color)]"
              >
                {isOpen ? "✖" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-800">
            <div className="flex flex-col items-center space-y-2 py-4">
              <a
                href="/"
                className="text-gray-300 hover:text-[var(--accent-color)] py-2 px-4 hover:bg-gray-700 rounded-md transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[var(--accent-color)] py-2 px-4 hover:bg-gray-700 rounded-md transition-colors"
              >
                About
              </a>

              {/* Mobile Category Dropdowns */}
              {Object.keys(services).map((category) => (
                <div key={category} className="w-full max-w-sm">
                  <button
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === category ? null : category
                      )
                    }
                    className="w-full flex items-center justify-center text-gray-300 hover:text-[var(--accent-color)] py-2 px-4 hover:bg-gray-700 rounded-md transition-colors"
                  >
                    {category}
                    <svg
                      className={`w-4 h-4 ml-2 transform transition-transform ${
                        activeCategory === category ? "rotate-180" : "rotate-0"
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

                  {activeCategory === category && (
                    <div className="mt-2 bg-gray-700 rounded-md mx-4 mb-2">
                      {services[category].map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block px-4 py-2 text-gray-200 hover:bg-gray-600 text-sm transition-colors first:rounded-t-md last:rounded-b-md"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <a
                href="/contact"
                className="text-gray-300 hover:text-[var(--accent-color)] py-2 px-4 hover:bg-gray-700 rounded-md transition-colors"
              >
                Contact
              </a>

              <div className="flex flex-col items-center space-y-2 pt-4"></div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

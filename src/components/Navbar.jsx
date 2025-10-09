import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile
  const [activeCategory, setActiveCategory] = useState(null); // for nested dropdown
  const navRef = useRef(null);

  // close dropdown on outside click (only for desktop)
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Only handle outside clicks for desktop dropdown
      if (navRef.current && !navRef.current.contains(e.target) && !isOpen) {
        setActiveCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // services data with paths
  const services = {
    "Data Tools": [
      { name: "JSON formatter", path: "/DevToolsBox/tools/json-formatter" },
      { name: "Base64", path: "/DevToolsBox/tools/base64" },
      { name: "UUID", path: "/DevToolsBox/tools/uuid" },
      { name: "Regex", path: "/DevToolsBox/tools/regex" },
      { name: "JWT", path: "/DevToolsBox/tools/jwt" },
      { name: "Cron tester", path: "/DevToolsBox/tools/cron" },
    ],
    Coding: [
      {
        name: "Snippet generator",
        path: "/DevToolsBox/tools/snippet-generator",
      },
      {
        name: "Dockerfile templates",
        path: "/DevToolsBox/tools/dockerfile",
      },
      {
        name: "Gitignore templates",
        path: "/DevToolsBox/tools/gitignore",
      },
      {
        name: "CSS gradient generator",
        path: "/DevToolsBox/tools/css-gradient",
      },
      {
        name: "CSS animation generator",
        path: "/DevToolsBox/tools/css-animation",
      },
      {
        name: "Tailwind visualizer",
        path: "/DevToolsBox/tools/tailwind-visualizer",
      },
    ],
    "UI Tools": [
      { name: "Color palette", path: "/DevToolsBox/tools/color-palette" },
      { name: "Markdown → HTML", path: "/DevToolsBox/tools/markdown-html" },
      {
        name: "Responsive design tester",
        path: "/DevToolsBox/tools/responsive-design-tester",
      },
      { name: "SVG → JSX", path: "/DevToolsBox/tools/svg-jsx" },
      { name: "Icon library", path: "/DevToolsBox/tools/icons" },
    ],
    Productivity: [
      { name: "Timezone converter", path: "/DevToolsBox/tools/timezone" },
      { name: "Code diff checker", path: "/DevToolsBox/tools/code-diff" },
      { name: "Git cheatsheet", path: "/DevToolsBox/tools/git-cheatsheet" },
    ],
  };
  return (
    <>
      <nav className="bg-[var(--primary-color)] rounded-xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link className="flex items-center" to="/DevToolsBox">
              <img className="h-8 w-8 mr-2" src={Logo} alt="Logo" />
              <span className="text-white font-bold text-lg">DevTools</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6" ref={navRef}>
              <Link
                to="/DevToolsBox"
                className="text-[var(--accent-color)] hover:text-[var(--accent-color)]"
              >
                Home
              </Link>
              <Link
                to="/DevToolsBox/about"
                className="text-gray-300 hover:text-[var(--accent-color)]"
              >
                About
              </Link>

              {/* Category dropdowns */}
              {Object.keys(services).map((category) => (
                <div key={category} className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCategory(
                        activeCategory === category ? null : category
                      );
                    }}
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
                    <div
                      className="absolute z-20 mt-2 w-56 bg-gray-700 rounded-md shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {services[category].map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-4 py-2 text-gray-200 hover:bg-gray-600 first:rounded-t-md last:rounded-b-md"
                          onClick={() => setActiveCategory(null)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                to="/DevToolsBox/contact"
                className="text-gray-300 hover:text-[var(--accent-color)]"
              >
                Contact
              </Link>
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
              <Link
                to="/"
                className="text-gray-300 hover:text-[var(--accent-color)] py-2 px-4 hover:bg-gray-700 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/DevToolsBox/about"
                className="text-gray-300 hover:text-[var(--accent-color)] py-2 px-4 hover:bg-gray-700 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

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
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-4 py-2 text-gray-200 hover:bg-gray-600 text-sm transition-colors first:rounded-t-md last:rounded-b-md"
                          onClick={() => {
                            setActiveCategory(null);
                            setIsOpen(false);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                to="/DevToolsBox/contact"
                className="text-gray-300 hover:text-[var(--accent-color)] py-2 px-4 hover:bg-gray-700 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <div className="flex flex-col items-center space-y-2 pt-4"></div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

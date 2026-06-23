import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { Link, useLocation } from "react-router-dom";
import { CommandPalette } from "./CommandPalette.jsx";
import { FaSearch, FaChevronDown, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext.jsx";
import { ALL_TOOLS } from "../config/tools.jsx";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [activeCategory, setActiveCategory] = useState(null); // category dropdown
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // close dropdown on outside click (desktop)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target) && !isOpen) {
        setActiveCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Listen for keyboard shortcuts: Ctrl+K / Cmd+K or / to open command palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveCategory(null);
  }, [location]);

  // Dynamic services data grouped by category from ALL_TOOLS registry
  const services = ALL_TOOLS.reduce((acc, tool) => {
    const category = tool.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push({ name: tool.title, path: tool.path });
    return acc;
  }, {});

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-slate-800 sticky top-0 z-40 w-full transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link className="flex items-center group" to="/DevToolsBox">
              <img className="h-8 w-8 mr-2.5 transition-transform group-hover:scale-105" src={Logo} alt="Logo" />
              <span className="text-neutral-900 dark:text-white font-bold text-lg font-brand tracking-tight">
                DevTools<span className="text-neutral-900 dark:text-white">Box</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1" ref={navRef}>
              <Link
                to="/DevToolsBox"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActivePath("/DevToolsBox")
                    ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-slate-850 font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-slate-800/60"
                }`}
              >
                Home
              </Link>
              <Link
                to="/DevToolsBox/about"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActivePath("/DevToolsBox/about")
                    ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-slate-850 font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-slate-800/60"
                }`}
              >
                About
              </Link>

              {/* Category dropdowns */}
              {Object.keys(services).map((category) => {
                const hasActiveItem = services[category].some(item => isActivePath(item.path));
                return (
                  <div key={category} className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCategory(
                          activeCategory === category ? null : category
                        );
                      }}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                        hasActiveItem
                          ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-slate-850 font-semibold"
                          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      <span>{category}</span>
                      <FaChevronDown
                        className={`w-2.5 h-2.5 ml-0.5 transition-transform duration-200 ${
                          activeCategory === category ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {activeCategory === category && (
                      <div
                        className="absolute z-20 mt-2.5 w-56 bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-lg shadow-lg py-1 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {services[category].map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`block px-4 py-2.5 text-xs transition-colors ${
                              isActivePath(item.path)
                                ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-slate-850 font-semibold"
                                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-slate-800/60"
                            }`}
                            onClick={() => setActiveCategory(null)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                to="/DevToolsBox/contact"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActivePath("/DevToolsBox/contact")
                    ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-slate-850 font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-slate-800/60"
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Right Side Search Trigger & Theme Toggle */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => setIsCommandPaletteOpen(true)}
                className="flex items-center gap-2 bg-neutral-50 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 hover:border-neutral-300 dark:hover:border-slate-650 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 px-3.5 py-1.75 rounded-lg transition-all text-xs cursor-pointer shadow-xs"
              >
                <FaSearch className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
                <span>Search tools...</span>
                <kbd className="bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 px-1.5 py-0.5 rounded text-[9px] text-neutral-500 dark:text-neutral-400 font-mono select-none">⌘K</kbd>
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-50 dark:bg-slate-800 hover:bg-neutral-100 dark:hover:bg-slate-750 rounded-lg border border-neutral-200 dark:border-slate-700 transition-all cursor-pointer shadow-xs"
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {theme === "dark" ? <FaSun className="w-3.5 h-3.5" /> : <FaMoon className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Mobile button block */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-50 dark:bg-slate-850 rounded-md border border-neutral-200 dark:border-slate-800 cursor-pointer"
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {theme === "dark" ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => setIsCommandPaletteOpen(true)}
                className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-50 dark:bg-slate-850 rounded-md border border-neutral-200 dark:border-slate-800 cursor-pointer"
                title="Search Tools"
              >
                <FaSearch className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-50 dark:bg-slate-850 rounded-md border border-neutral-200 dark:border-slate-800 cursor-pointer"
              >
                {isOpen ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-neutral-200 dark:border-slate-800">
            <div className="flex flex-col space-y-1 py-3 px-4">
              <Link
                to="/DevToolsBox"
                className={`py-2 px-3 text-sm rounded-md transition-colors ${
                  isActivePath("/DevToolsBox")
                    ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-slate-850 font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-55/20 dark:hover:bg-slate-800/40"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/DevToolsBox/about"
                className={`py-2 px-3 text-sm rounded-md transition-colors ${
                  isActivePath("/DevToolsBox/about")
                    ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-slate-850 font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-55/20 dark:hover:bg-slate-800/40"
                }`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              {/* Mobile Category Dropdowns */}
              {Object.keys(services).map((category) => {
                const isCatActive = services[category].some(item => isActivePath(item.path));
                return (
                  <div key={category} className="w-full">
                    <button
                      onClick={() =>
                        setActiveCategory(
                          activeCategory === category ? null : category
                        )
                      }
                      className={`w-full flex items-center justify-between py-2 px-3 text-sm rounded-md transition-colors ${
                        isCatActive 
                          ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-slate-850 font-semibold" 
                          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-55/20 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      <span>{category}</span>
                      <FaChevronDown
                        className={`w-3 h-3 ml-2 transform transition-transform duration-200 ${
                          activeCategory === category ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {activeCategory === category && (
                      <div className="mt-1 bg-neutral-50 dark:bg-slate-950 border border-neutral-200 dark:border-slate-800 rounded-lg mx-2 mb-2 overflow-hidden">
                        {services[category].map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`block px-4 py-2.5 text-xs transition-colors ${
                              isActivePath(item.path)
                                ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-slate-850 font-semibold"
                                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50/50 dark:hover:bg-slate-800/30"
                            }`}
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
                );
              })}

              <Link
                to="/DevToolsBox/contact"
                className={`py-2 px-3 text-sm rounded-md transition-colors ${
                  isActivePath("/DevToolsBox/contact")
                    ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-slate-850 font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-55/20 dark:hover:bg-slate-800/40"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Global Command Search Overlay */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
    </>
  );
};

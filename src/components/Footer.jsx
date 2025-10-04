import React from "react";
import Logo from "../assets/Logo.png";

export const Footer = () => {
  return (
    <footer className="bg-[#222831] text-gray-300 rounded-lg">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-8 mr-2" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              DevTools
            </span>
          </div>

          {/* Links */}
          <ul className="flex flex-wrap items-center text-sm font-medium gap-6">
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>

          {/* Subscribe */}
          <form className="flex w-full md:w-auto">
            <div className="relative flex w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.94 6.94a.75.75 0 011.06 0l5.657 5.657 5.657-5.657a.75.75 0 111.06 1.06l-6.187 6.187a.75.75 0 01-1.06 0L2.94 8a.75.75 0 010-1.06z" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-md bg-gray-700 text-sm text-gray-200 pl-9 pr-3 py-2 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/80 text-white rounded-r-md text-sm font-medium"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-600 sm:mx-auto lg:my-8" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-sm text-gray-400">
            © 2025 DevTools™. All Rights Reserved.
          </span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-dribbble"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

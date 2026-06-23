import React from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub, FaDribbble, FaPaperPlane } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-slate-800 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Top Row Grid */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-10">
          {/* Logo Group */}
          <div className="flex items-center select-none">
            <img src={Logo} alt="Logo" className="h-7 w-7 mr-2.5" />
            <span className="text-lg font-bold text-neutral-900 dark:text-white font-brand tracking-tight">
              DevTools<span className="text-neutral-900 dark:text-white">Box</span>
            </span>
          </div>

          {/* Site Navigation Links */}
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            <li>
              <Link to="/DevToolsBox" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/DevToolsBox/about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/DevToolsBox/contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>

          {/* Email Newsletter Subscribe */}
          <form className="flex w-full sm:w-80 lg:w-auto" onSubmit={(e) => { e.preventDefault(); alert("📬 Subscribed successfully! (Demo Mode)"); }}>
            <div className="relative flex w-full">
              <input
                type="email"
                required
                placeholder="Subscribe to updates"
                className="w-full sm:w-64 rounded-l-lg bg-white dark:bg-slate-950 border border-neutral-200 dark:border-slate-800 text-xs text-neutral-900 dark:text-white pl-4 pr-3 py-2.5 focus:border-neutral-900 dark:focus:border-white focus:ring-2 focus:ring-neutral-900/5 dark:focus:ring-white/5 outline-none transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-900 rounded-r-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer select-none shadow-sm"
              >
                <FaPaperPlane className="w-2.5 h-2.5" />
                <span>Join</span>
              </button>
            </div>
          </form>
        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-neutral-100 dark:border-slate-800/80 my-8" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <span className="text-xs text-neutral-450 dark:text-neutral-500 font-medium">
            © {new Date().getFullYear()} DevToolsBox™. Open-source MIT License.
          </span>
          
          {/* Social Icons Group */}
          <div className="flex space-x-5">
            <a href="https://github.com/ashikulislamm" target="_blank" rel="noopener noreferrer" className="text-neutral-450 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm" title="GitHub">
              <FaGithub />
            </a>
            <a href="#" className="text-neutral-450 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm" title="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="text-neutral-450 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm" title="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="text-neutral-450 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm" title="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="text-neutral-450 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm" title="Dribbble">
              <FaDribbble />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

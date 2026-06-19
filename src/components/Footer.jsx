import React from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub, FaDribbble, FaPaperPlane } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Top Row Grid */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-10">
          {/* Logo Group */}
          <div className="flex items-center select-none">
            <img src={Logo} alt="Logo" className="h-7 w-7 mr-2.5" />
            <span className="text-lg font-bold text-white font-brand tracking-tight">
              DevTools<span className="text-[var(--accent-color)]">Box</span>
            </span>
          </div>

          {/* Site Navigation Links */}
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-400">
            <li>
              <Link to="/DevToolsBox" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/DevToolsBox/about" className="hover:text-white transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/DevToolsBox/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
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
                className="w-full sm:w-64 rounded-l-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 pl-4 pr-3 py-2.5 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/25 outline-none transition-all placeholder:text-slate-600"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[var(--accent-color)] hover:bg-[#9790f9] text-white rounded-r-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer select-none shadow-sm"
              >
                <FaPaperPlane className="w-2.5 h-2.5" />
                <span>Join</span>
              </button>
            </div>
          </form>
        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-slate-800/80 my-8" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <span className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} DevToolsBox™. Open-source MIT License.
          </span>
          
          {/* Social Icons Group */}
          <div className="flex space-x-5">
            <a href="https://github.com/ashikulislamm" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors text-sm" title="GitHub">
              <FaGithub />
            </a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm" title="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm" title="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm" title="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm" title="Dribbble">
              <FaDribbble />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

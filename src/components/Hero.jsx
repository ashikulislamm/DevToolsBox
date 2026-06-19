import React from "react";
import { FaArrowRight, FaCode, FaArrowDown } from "react-icons/fa";

export const Hero = () => {
  // Trigger command palette manually via custom keyboard event
  const triggerSearchPalette = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);
  };

  // Scroll down to directory
  const scrollToDirectory = (e) => {
    e.preventDefault();
    const directory = document.querySelector(".container, .max-w-7xl");
    if (directory) {
      directory.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-200/80 bg-white">
      {/* Premium Tech Grid & Glow Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
        <svg className="w-full h-full stroke-slate-200/50 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]">
          <defs>
            <pattern id="grid-pattern" width="24" height="24" patternUnits="userSpaceOnUse" x="50%">
              <path d="M.5 24V.5H24" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Decorative Radial Glow Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-b from-[#847cfa]/15 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Release Announcement Badge */}
        <div className="flex justify-center">
          <span 
            onClick={triggerSearchPalette}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-color)]/5 border border-[var(--accent-color)]/20 px-3.5 py-1.25 text-xs font-semibold text-[var(--accent-color)] hover:bg-[var(--accent-color)]/10 transition-colors cursor-pointer select-none shadow-sm"
          >
            <span className="bg-[var(--accent-color)] text-white text-[9px] px-2 py-0.5 rounded-full font-brand">
              PRO
            </span>
            <span>Version 2.0.0 is live • Press Ctrl+K</span>
            <FaArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-[var(--primary-color)] mt-8 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl font-brand">
          The Open Toolbox for <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] bg-clip-text text-transparent">
            Modern Developers
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-[var(--secondary-color)] max-w-2xl mx-auto leading-relaxed">
          A free, open-source suite of developer utilities designed for everyday coding
          needs. Format JSON, generate tokens, visualize configurations, and preview assets — secure, client-side, and instant.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={triggerSearchPalette}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-[var(--accent-color)] hover:bg-[#9790f9] rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-98 cursor-pointer select-none text-sm"
          >
            <FaCode className="w-3.5 h-3.5" />
            <span>Search utilities</span>
          </button>
          
          <a
            href="#directory"
            onClick={scrollToDirectory}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-98 cursor-pointer select-none"
          >
            <FaArrowDown className="w-3 h-3 text-slate-500" />
            <span>Browse directory</span>
          </a>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaShieldAlt, FaBolt, FaCoffee, FaHeart } from "react-icons/fa";

export default function About() {
  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      {/* Background Subtle Mesh & Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <svg className="w-full h-full stroke-neutral-200/50 dark:stroke-neutral-800/50 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]">
          <defs>
            <pattern id="about-grid" width="32" height="32" patternUnits="userSpaceOnUse" x="50%">
              <path d="M.5 32V.5H32" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neutral-200/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        {/* Release Pill */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 dark:bg-slate-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-slate-700 px-3.5 py-1 text-xs font-semibold select-none shadow-sm">
            <FaHeart className="w-3 h-3 text-red-500 animate-pulse" />
            <span>Built by developers, for developers</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-brand mb-6">
          Meet <span className="text-neutral-900 dark:text-white">DevToolsBox</span>
        </h1>
        
        <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          An interactive, open-source hub of utility tools designed to save you time. 
          Debug, format, test, and generate configurations directly in your browser.
        </p>

        {/* Core Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="bg-neutral-50 dark:bg-slate-950/40 w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-neutral-200 dark:border-slate-800">
              <FaShieldAlt className="text-neutral-800 dark:text-neutral-200 w-5 h-5" />
            </div>
            <h3 className="text-neutral-900 dark:text-white font-bold text-sm mb-2 font-brand">Privacy First</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
              All tools run fully client-side. Your inputs, tokens, and code never touch a server, ensuring maximum data security.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="bg-neutral-50 dark:bg-slate-950/40 w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-neutral-200 dark:border-slate-800">
              <FaBolt className="text-neutral-800 dark:text-neutral-200 w-5 h-5" />
            </div>
            <h3 className="text-neutral-900 dark:text-white font-bold text-sm mb-2 font-brand">Instant Speed</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
              No page reloads or API latency. Utilities execute locally with real-time feedback and state formatting.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="bg-neutral-50 dark:bg-slate-950/40 w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-neutral-200 dark:border-slate-800">
              <FaCode className="text-neutral-800 dark:text-neutral-200 w-5 h-5" />
            </div>
            <h3 className="text-neutral-900 dark:text-white font-bold text-sm mb-2 font-brand">Open & Free</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">
              Fully free toolbox with MIT licensing. Access 14+ robust web utility generators and formatters without subscription walls.
            </p>
          </div>
        </div>

        {/* Developer Card Section */}
        <div className="mt-16 bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-2xl p-8 text-left relative overflow-hidden shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-6 font-brand flex items-center gap-2 select-none">
            <span>👨‍💻</span> Project Developer
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-8">
            {/* Developer Photo Widget */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-neutral-900 dark:bg-slate-800 flex items-center justify-center text-3xl font-extrabold text-white dark:text-neutral-100 shadow-sm shrink-0 select-none">
              AI
            </div>
            
            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1 font-brand">
                Ashikul Islam
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs font-semibold mb-3">
                Full Stack Developer & Open Source Advocate
              </p>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-lg">
                Hi! I build high-performance, developer-focused utilities that speed up code authoring, regex building, and asset conversions.
              </p>
              
              {/* Profile links */}
              <div className="flex justify-center sm:justify-start gap-3 mt-6">
                <a
                  href="https://github.com/ashikulislamm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold transition-colors flex items-center gap-2 border border-transparent"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/ashikulislammm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-white dark:bg-slate-905 hover:bg-neutral-50 dark:hover:bg-slate-800 text-neutral-900 dark:text-white text-xs font-semibold transition-colors flex items-center gap-2 border border-neutral-900 dark:border-slate-700 shadow-xs"
                >
                  <FaLinkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-neutral-100 dark:border-slate-800/60 pt-6 mt-8">
            <div className="text-center p-3 bg-neutral-50 dark:bg-slate-950/40 rounded-xl border border-neutral-200/60 dark:border-slate-800/40">
              <div className="text-xl font-bold text-neutral-900 dark:text-white font-brand">14+</div>
              <div className="text-[9px] uppercase tracking-wider text-neutral-550 dark:text-neutral-400 font-brand font-semibold mt-0.5">Tools Built</div>
            </div>
            <div className="text-center p-3 bg-neutral-50 dark:bg-slate-950/40 rounded-xl border border-neutral-200/60 dark:border-slate-800/40">
              <div className="text-xl font-bold text-neutral-900 dark:text-white font-brand">100%</div>
              <div className="text-[9px] uppercase tracking-wider text-neutral-550 dark:text-neutral-400 font-brand font-semibold mt-0.5">Open Source</div>
            </div>
            <div className="text-center p-3 bg-neutral-50 dark:bg-slate-950/40 rounded-xl border border-neutral-200/60 dark:border-slate-800/40">
              <div className="text-xl font-bold text-neutral-900 dark:text-white font-brand">Fast</div>
              <div className="text-[9px] uppercase tracking-wider text-neutral-550 dark:text-neutral-400 font-brand font-semibold mt-0.5">Execution</div>
            </div>
            <div className="text-center p-3 bg-neutral-50 dark:bg-slate-950/40 rounded-xl border border-neutral-200/60 dark:border-slate-800/40">
              <div className="text-xl font-bold text-neutral-900 dark:text-white font-brand">∞</div>
              <div className="text-[9px] uppercase tracking-wider text-neutral-550 dark:text-neutral-400 font-brand font-semibold mt-0.5">Developer Love ☕</div>
            </div>
          </div>

          {/* Mail Me */}
          <div className="mt-6 text-center border-t border-neutral-100 dark:border-slate-800/60 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-neutral-550 dark:text-neutral-400 text-xs">
              Have a custom tool suggestion or need collaboration?
            </p>
            <a
              href="mailto:ashikulislamm@gmail.com"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <FaEnvelope className="w-3.5 h-3.5" />
              <span>Contact Ashikul</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

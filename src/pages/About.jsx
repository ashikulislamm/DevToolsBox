export default function About() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16 mt-8 mb-8 rounded-lg"
      style={{
        
        color: "#fff",
        fontFamily: "var(--font-family)",
      }}
    >
      <div className="max-w-4xl w-full text-center">
        {/* Title Section */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-black">
          About <span style={{ color: "var(--accent-color)" }}>DevToolbox</span>
        </h1>
        <p className="text-black text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
          DevToolbox is a collection of{" "}
          <span className="text-[var(--accent-color)] font-semibold">
            developer-focused utilities
          </span>{" "}
          built to save time, improve productivity, and simplify daily tasks —
          all inside your browser.
        </p>

        {/* Divider */}
        <div
          className="mt-8 mb-12 mx-auto h-1 w-24 rounded-full"
          style={{ backgroundColor: "var(--accent-color)" }}
        ></div>

        {/* Mission Section */}
        <div className="space-y-6 text-black text-base sm:text-lg">
          <p>
            Whether you’re formatting JSON, generating UUIDs, testing regex
            patterns, or visualizing Tailwind classes — DevToolbox brings all
            essential tools together in one clean, unified interface.
          </p>
          <p>
            Built using <span className="font-semibold text-[var(--accent-color)]">React</span>{" "}
            and <span className="font-semibold text-[var(--accent-color)]">Tailwind CSS</span>,
            DevToolbox runs fully client-side, meaning your data never leaves
            your browser — ensuring privacy and speed.
          </p>
          <p>
            Our goal is to make development smoother and smarter — so you can
            focus on what truly matters:{" "}
            <span className="font-semibold text-[var(--accent-color)]">
              building great things
            </span>
            .
          </p>
        </div>

        {/* Stats / Highlights */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl border border-gray-700 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/80 transition">
            <h3 className="text-3xl font-bold text-white">18+</h3>
            <p className="text-[var(--accent-color)] mt-2 text-sm font-semibold uppercase tracking-wide">
              Developer Tools
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-gray-700 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/80 transition">
            <h3 className="text-3xl font-bold text-white">100%</h3>
            <p className="text-[var(--accent-color)] mt-2 text-sm font-semibold uppercase tracking-wide">
              Frontend Only
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-gray-700 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/80 transition">
            <h3 className="text-3xl font-bold text-white">∞</h3>
            <p className="text-[var(--accent-color)] mt-2 text-sm font-semibold uppercase tracking-wide">
              Usage Freedom
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <p className="text-gray-400 mb-4 text-lg">
            DevToolbox is continuously evolving — new tools and features are
            added regularly.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: "var(--accent-color)" }}
          >
            Explore Tools
          </a>
        </div>

        {/* Developer Info Section */}
        <div className="mt-16 p-8 rounded-2xl border border-gray-700 bg-[var(--primary-color)]">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
            👨‍💻 Meet the Developer
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            {/* Developer Avatar/Photo */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
              👨‍💻
            </div>
            
            {/* Developer Info */}
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-white mb-2">
                Ashikul Islam
              </h3>
              <p className="text-[var(--accent-color)] font-semibold mb-3">
                Full Stack Developer & DevTools Enthusiast
              </p>
              <p className="text-gray-300 max-w-md leading-relaxed">
                Passionate about creating developer tools that make coding life easier. 
                Specializing in React, JavaScript, and modern web technologies.
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center sm:justify-start gap-4 mt-4">
                <a
                  href="https://github.com/ashikulislamm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium transition-colors flex items-center gap-2"
                >
                  🐙 GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/ashikulislammm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[var(--accent-color)] text-white text-sm font-medium transition-colors flex items-center gap-2"
                >
                  💼 LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Developer Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-[var(--primary-color)] rounded-lg">
              <div className="text-2xl font-bold text-white">2024</div>
              <div className="text-xs uppercase tracking-wide text-[var(--accent-color)]">Started</div>
            </div>
            <div className="text-center p-4 bg-[var(--primary-color)] rounded-lg">
              <div className="text-2xl font-bold text-white">18+</div>
              <div className="text-xs uppercase tracking-wide text-[var(--accent-color)]">Tools Built</div>
            </div>
            <div className="text-center p-4 bg-[var(--primary-color)] rounded-lg">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-xs uppercase tracking-wide text-[var(--accent-color)]">Open Source</div>
            </div>
            <div className="text-center p-4 bg-[var(--primary-color)] rounded-lg">
              <div className="text-2xl font-bold text-white">∞</div>
              <div className="text-xs uppercase tracking-wide text-[var(--accent-color)]">Coffee ☕</div>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm mb-2">
              Have suggestions or want to collaborate?
            </p>
            <a
              href="mailto:ashikulislamm@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
            >
              📧 Get in Touch
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <footer className="mt-16 text-sm text-gray-500">
          © {new Date().getFullYear()} DevToolbox. Crafted with ❤️ for
          developers.
        </footer>
      </div>
    </div>
  );
}

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

        {/* Footer Note */}
        <footer className="mt-16 text-sm text-gray-500">
          © {new Date().getFullYear()} DevToolbox. Crafted with ❤️ for
          developers.
        </footer>
      </div>
    </div>
  );
}

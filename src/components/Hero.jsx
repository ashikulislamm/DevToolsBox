import React from "react";

export const Hero = () => {
  return (
    <section className="text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#1447E6] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 py-16 lg:py-24 text-center">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-color)] px-1.75 py-1.25 text-sm font-medium text-white-400">
            <span className="bg-[#9089fc] text-white text-xs px-2 py-0.5 rounded-full">
              New
            </span>
            Dev Tools Box is out now →
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-[var(--primary-color)] mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          The Open Toolbox for Modern Developers
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-[var(--secondary-color)] max-w-4xl mx-auto">
          A free, open-source hub of utilities designed for everyday coding
          needs. Whether you’re debugging, testing, or designing—DevToolbox
          saves you time at every step.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 font-bold text-white bg-[var(--accent-color)] rounded-xl"
          >
            Get started →
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-900 bg-white rounded-xl hover:bg-gray-100"
          >
            <svg
              class="w-6 h-6 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 28 28"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"
              />
            </svg>
            Explore Tools
          </a>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#1447E6] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
        />
      </div>
    </section>
  );
};

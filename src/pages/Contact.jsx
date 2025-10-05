// src/pages/ContactPage.jsx
import { useState } from "react";
import { HiBuildingOffice2, HiMapPin, HiPhone } from "react-icons/hi2";

export function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    message: "",
    agree: false,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: send to backend
    console.log("contact form:", form);
    alert("Message sent (demo). Hook this up to your API!");
  };

  return (
    <>
      <section className="bg-[#0F172A] text-white py-12 px-6 mt-20 rounded-lg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {/* Company Info */}
          <div>
            <div className="flex justify-center mb-4">
              <div className="bg-gray-800 p-3 rounded-md">
                <HiBuildingOffice2 className="text-white text-3xl" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-1">Company information</h3>
            <p>DevTools Box LLC</p>
          </div>

          {/* Address */}
          <div>
            <div className="flex justify-center mb-4">
              <div className="bg-gray-800 p-3 rounded-md">
                <HiMapPin className="text-white text-3xl" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-1">Address</h3>
            <p>Khilgoan, Dhaka</p>
            <p>Bangladesh , 1204</p>
          </div>

          {/* Contact */}
          <div>
            <div className="flex justify-center mb-4">
              <div className="bg-gray-800 p-3 rounded-md">
                <HiPhone className="text-white text-3xl" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-1">Email us</h3>
            <p>Email us for general queries</p>
            <p className="text-[#7886c7] font-semibold mt-1">
              hello@devtoolsbox.com
            </p>
          </div>
        </div>
      </section>

      <div className="relative rounded-lg bg-gray-900 px-6 mt-8 mb-8 py-24 sm:py-32 lg:px-8 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[72.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-[90rem]"
          />
        </div>
        <div className="relative mx-auto max-w-2xl text-center z-10">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            Contact Me
          </h2>
          <p className="mt-2 text-lg/8 text-gray-400">
            Aute magna irure deserunt veniam aliqua magna enim voluptate.
          </p>
        </div>
        <form
          action="#"
          method="POST"
          className="relative mx-auto mt-16 max-w-xl sm:mt-20 z-10"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-semibold text-white"
              >
                First name
              </label>
              <div className="mt-2.5">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-semibold text-white"
              >
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm/6 font-semibold text-white"
              >
                Company
              </label>
              <div className="mt-2.5">
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm/6 font-semibold text-white"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm/6 font-semibold text-white"
              >
                Phone number
              </label>
              <div className="mt-2.5">
                <div className="flex rounded-md bg-white/5 outline-1 -outline-offset-1 outline-white/10 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                  <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country"
                      aria-label="Country"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-transparent py-2 pr-7 pl-3.5 text-base text-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    >
                      <option>US</option>
                      <option>CA</option>
                      <option>EU</option>
                    </select>
                  </div>
                  <input
                    id="phone-number"
                    name="phone-number"
                    type="text"
                    placeholder="123-456-7890"
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm/6 font-semibold text-white"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                  defaultValue={""}
                />
              </div>
            </div>
            <div className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-white/5 p-px inset-ring inset-ring-white/10 outline-offset-2 outline-indigo-500 transition-colors duration-200 ease-in-out has-checked:bg-indigo-500 has-focus-visible:outline-2">
                  <span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" />
                  <input
                    id="agree-to-policies"
                    name="agree-to-policies"
                    type="checkbox"
                    aria-label="Agree to policies"
                    className="absolute inset-0 appearance-none focus:outline-hidden"
                  />
                </div>
              </div>
              <label
                htmlFor="agree-to-policies"
                className="text-sm/6 text-gray-400"
              >
                By selecting this, you agree to our{" "}
                <a
                  href="#"
                  className="font-semibold whitespace-nowrap text-indigo-400"
                >
                  privacy policy
                </a>
                .
              </label>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-[var(--accent-color)] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Let's talk
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

/* tiny inline icons (no external deps) */
function PhoneIcon() {
  return (
    <svg
      className="h-5 w-5 text-gray-700 dark:text-slate-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h1.6a2 2 0 011.9 1.37l.7 2.09a2 2 0 01-.45 2.04l-1 1a15.9 15.9 0 006.36 6.36l1-1a2 2 0 012.04-.45l2.09.7A2 2 0 0121 18.4V20a2 2 0 01-2 2h-.5C9.6 22 2 14.4 2 5.5V5z"
      />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg
      className="h-5 w-5 text-gray-700 dark:text-slate-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}
function TicketIcon() {
  return (
    <svg
      className="h-5 w-5 text-gray-700 dark:text-slate-300"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 01-2 2 2 2 0 000 4 2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 012-2 2 2 0 000-4 2 2 0 01-2-2V6z" />
    </svg>
  );
}

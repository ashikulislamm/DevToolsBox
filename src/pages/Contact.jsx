import { useState } from "react";
import { HiBuildingOffice2, HiMapPin, HiPhone, HiEnvelope } from "react-icons/hi2";
import { FaPaperPlane, FaGithub, FaTwitter, FaLinkedin, FaDribbble, FaInfoCircle } from "react-icons/fa";

export function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("contact form submitted:", form);
    alert("🚀 Message received! In a production environment, this form would trigger an API call. Thanks for checking out the demo!");
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      message: "",
    });
  };

  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <svg className="w-full h-full stroke-neutral-200/50 dark:stroke-neutral-800/50 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]">
          <defs>
            <pattern id="contact-grid" width="32" height="32" patternUnits="userSpaceOnUse" x="50%">
              <path d="M.5 32V.5H32" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info (Span 5) */}
          <div className="lg:col-span-5 space-y-8 lg:pr-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 dark:bg-slate-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-slate-700 px-3.5 py-1 text-xs font-semibold select-none shadow-sm">
                <FaInfoCircle className="w-3.5 h-3.5" />
                <span>Contact support or feedback</span>
              </span>
              <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-brand mt-6">
                Get in Touch
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mt-4">
                Have ideas on how to improve DevToolsBox or want to report a broken formatter? Drop us a message. We value all developer feedback!
              </p>
            </div>

            {/* Visual Cards Coordinates */}
            <div className="space-y-4">
              {/* Card 1 */}
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-xl shadow-sm hover:border-neutral-300 dark:hover:border-slate-700 transition-colors">
                <div className="bg-neutral-50 dark:bg-slate-950/40 p-2.5 rounded-lg border border-neutral-200 dark:border-slate-800 shrink-0 mt-0.5">
                  <HiBuildingOffice2 className="text-neutral-800 dark:text-neutral-200 text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900 dark:text-white font-brand">Company Details</h4>
                  <p className="text-neutral-500 dark:text-neutral-450 text-xs mt-0.5">DevToolsBox LLC</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-xl shadow-sm hover:border-neutral-300 dark:hover:border-slate-700 transition-colors">
                <div className="bg-neutral-50 dark:bg-slate-950/40 p-2.5 rounded-lg border border-neutral-200 dark:border-slate-800 shrink-0 mt-0.5">
                  <HiMapPin className="text-neutral-800 dark:text-neutral-200 text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900 dark:text-white font-brand">Location</h4>
                  <p className="text-neutral-500 dark:text-neutral-450 text-xs mt-0.5">Khilgaon, Dhaka, Bangladesh, 1204</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-xl shadow-sm hover:border-neutral-300 dark:hover:border-slate-700 transition-colors">
                <div className="bg-neutral-50 dark:bg-slate-950/40 p-2.5 rounded-lg border border-neutral-200 dark:border-slate-800 shrink-0 mt-0.5">
                  <HiEnvelope className="text-neutral-800 dark:text-neutral-200 text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900 dark:text-white font-brand">Email Channel</h4>
                  <p className="text-neutral-800 dark:text-neutral-200 text-xs font-semibold mt-0.5">hello@devtoolsbox.com</p>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="pt-2">
              <h5 className="text-[10px] uppercase font-bold tracking-wider text-neutral-450 dark:text-neutral-500 font-brand mb-3">Follow Updates</h5>
              <div className="flex gap-2">
                <a href="https://github.com/ashikulislamm" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white dark:bg-slate-905 hover:bg-neutral-50 dark:hover:bg-slate-800 text-neutral-605 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg border border-neutral-200 dark:border-slate-800 transition-colors text-sm shadow-xs" title="GitHub">
                  <FaGithub />
                </a>
                <a href="#" className="p-2.5 bg-white dark:bg-slate-905 hover:bg-neutral-50 dark:hover:bg-slate-800 text-neutral-605 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg border border-neutral-200 dark:border-slate-800 transition-colors text-sm shadow-xs" title="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="p-2.5 bg-white dark:bg-slate-905 hover:bg-neutral-50 dark:hover:bg-slate-800 text-neutral-605 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg border border-neutral-200 dark:border-slate-800 transition-colors text-sm shadow-xs" title="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="#" className="p-2.5 bg-white dark:bg-slate-905 hover:bg-neutral-50 dark:hover:bg-slate-800 text-neutral-605 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg border border-neutral-200 dark:border-slate-800 transition-colors text-sm shadow-xs" title="Dribbble">
                  <FaDribbble />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Panel (Span 7) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden text-neutral-900 dark:text-white w-full">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6 font-brand border-b border-neutral-100 dark:border-slate-800/80 pb-4 flex items-center gap-2 select-none">
              <span>✉️</span> Send a Message
            </h3>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={form.firstName}
                    onChange={onChange}
                    className="mt-2 block w-full rounded-lg bg-white dark:bg-slate-950 border border-neutral-200 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 px-3 py-2.5 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-505 focus:border-neutral-900 dark:focus:border-white focus:ring-2 focus:ring-neutral-900/5 dark:focus:ring-white/5 outline-none transition-all"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={form.lastName}
                    onChange={onChange}
                    className="mt-2 block w-full rounded-lg bg-white dark:bg-slate-950 border border-neutral-200 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 px-3 py-2.5 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-505 focus:border-neutral-900 dark:focus:border-white focus:ring-2 focus:ring-neutral-900/5 dark:focus:ring-white/5 outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  className="mt-2 block w-full rounded-lg bg-white dark:bg-slate-950 border border-neutral-200 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 px-3 py-2.5 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-505 focus:border-neutral-900 dark:focus:border-white focus:ring-2 focus:ring-neutral-900/5 dark:focus:ring-white/5 outline-none transition-all"
                  placeholder="jane.doe@example.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                  Company (Optional)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={onChange}
                  className="mt-2 block w-full rounded-lg bg-white dark:bg-slate-950 border border-neutral-200 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 px-3 py-2.5 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-505 focus:border-neutral-900 dark:focus:border-white focus:ring-2 focus:ring-neutral-900/5 dark:focus:ring-white/5 outline-none transition-all"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={onChange}
                  className="mt-2 block w-full rounded-lg bg-white dark:bg-slate-950 border border-neutral-200 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 px-3 py-2.5 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-505 focus:border-neutral-900 dark:focus:border-white focus:ring-2 focus:ring-neutral-900/5 dark:focus:ring-white/5 outline-none transition-all resize-none custom-scrollbar"
                  placeholder="Tell us about feedback or bugs..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 px-4 py-3 text-xs font-semibold text-white dark:text-neutral-900 shadow-sm transition-colors cursor-pointer select-none"
                >
                  <FaPaperPlane className="w-3 h-3" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

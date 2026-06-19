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
        <svg className="w-full h-full stroke-slate-200/50 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]">
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/20 px-3.5 py-1 text-xs font-semibold select-none shadow-sm">
                <FaInfoCircle className="w-3.5 h-3.5" />
                <span>Contact support or feedback</span>
              </span>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-brand mt-6">
                Get in Touch
              </h1>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-4">
                Have ideas on how to improve DevToolsBox or want to report a broken formatter? Drop us a message. We value all developer feedback!
              </p>
            </div>

            {/* Visual Cards Coordinates */}
            <div className="space-y-4">
              {/* Card 1 */}
              <div className="flex items-start gap-4 p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:border-slate-300 transition-colors">
                <div className="bg-[#847cfa]/10 p-2.5 rounded-xl border border-[#847cfa]/20 shrink-0 mt-0.5">
                  <HiBuildingOffice2 className="text-[var(--accent-color)] text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 font-brand">Company Details</h4>
                  <p className="text-slate-500 text-xs mt-0.5">DevToolsBox LLC</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex items-start gap-4 p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:border-slate-300 transition-colors">
                <div className="bg-[#847cfa]/10 p-2.5 rounded-xl border border-[#847cfa]/20 shrink-0 mt-0.5">
                  <HiMapPin className="text-[var(--accent-color)] text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 font-brand">Location</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Khilgaon, Dhaka, Bangladesh, 1204</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex items-start gap-4 p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:border-slate-300 transition-colors">
                <div className="bg-[#847cfa]/10 p-2.5 rounded-xl border border-[#847cfa]/20 shrink-0 mt-0.5">
                  <HiEnvelope className="text-[var(--accent-color)] text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 font-brand">Email Channel</h4>
                  <p className="text-[var(--accent-color)] text-xs font-semibold mt-0.5">hello@devtoolsbox.com</p>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="pt-2">
              <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-brand mb-3">Follow Updates</h5>
              <div className="flex gap-2">
                <a href="https://github.com/ashikulislamm" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded-xl border border-slate-200 transition-colors text-sm" title="GitHub">
                  <FaGithub />
                </a>
                <a href="#" className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded-xl border border-slate-200 transition-colors text-sm" title="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded-xl border border-slate-200 transition-colors text-sm" title="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="#" className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded-xl border border-slate-200 transition-colors text-sm" title="Dribbble">
                  <FaDribbble />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Panel (Span 7) */}
          <div className="lg:col-span-7 bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-white w-full">
            {/* Soft Backing Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--accent-color)]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

            <h3 className="text-lg font-bold text-white mb-6 font-brand border-b border-slate-800 pb-4 flex items-center gap-2 select-none">
              <span>✉️</span> Send a Message
            </h3>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-[11px] font-semibold text-slate-400">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={form.firstName}
                    onChange={onChange}
                    className="mt-2 block w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2.5 text-xs text-white placeholder:text-slate-700 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/25 outline-none transition-all"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-[11px] font-semibold text-slate-400">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={form.lastName}
                    onChange={onChange}
                    className="mt-2 block w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2.5 text-xs text-white placeholder:text-slate-700 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/25 outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-[11px] font-semibold text-slate-400">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  className="mt-2 block w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2.5 text-xs text-white placeholder:text-slate-700 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/25 outline-none transition-all"
                  placeholder="jane.doe@example.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-[11px] font-semibold text-slate-400">
                  Company (Optional)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={onChange}
                  className="mt-2 block w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2.5 text-xs text-white placeholder:text-slate-700 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/25 outline-none transition-all"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[11px] font-semibold text-slate-400">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={onChange}
                  className="mt-2 block w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2.5 text-xs text-white placeholder:text-slate-700 focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/25 outline-none transition-all resize-none custom-scrollbar"
                  placeholder="Tell us about feedback or bugs..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--accent-color)] hover:bg-[#9790f9] px-4 py-3 text-xs font-semibold text-white shadow-md transition-colors cursor-pointer select-none"
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

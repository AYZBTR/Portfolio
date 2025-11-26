// src/components/ContactSection.tsx
import type { ContactSettings } from "../services/settingsApi";
import type { HeroSettings } from "../services/settingsApi";


interface ContactProps {
  contact: ContactSettings;
}

export default function ContactSection({ contact }: ContactProps) {
  return (
    <section id="contact" data-scroll-section className="px-10 md:px-20 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Me</h2>

      <form className="max-w-xl space-y-6">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-4 bg-slate-800 rounded-xl text-white border border-slate-700 focus:border-indigo-500 outline-none"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-4 bg-slate-800 rounded-xl text-white border border-slate-700 focus:border-indigo-500 outline-none"
        />

        <textarea
          placeholder="Your Message"
          className="w-full p-4 bg-slate-800 rounded-xl h-40 text-white border border-slate-700 focus:border-indigo-500 outline-none"
        />

        <button
          type="submit"
          className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-lg font-medium shadow-lg shadow-indigo-500/40 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}

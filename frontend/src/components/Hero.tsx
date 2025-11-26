import { useScroll } from "../contexts/ScrollContext";
import type { HeroSettings } from "../services/settingsApi";

interface HeroProps {
  hero: HeroSettings;
}

export default function Hero({ hero }: HeroProps) {
  const { scrollToSection } = useScroll();

  return (
    <section
      id="hero"
      data-scroll-section
      className="px-10 md:px-20 pt-32 pb-32 flex flex-col md:flex-row items-center justify-between"
    >
      {/* LEFT SIDE */}
      <div className="max-w-xl">
        <p className="text-indigo-400 tracking-widest uppercase text-sm mb-3">
          {hero.title}
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Hi, I’m <span className="text-indigo-400">{hero.name}</span>.<br />
          I build modern web experiences.
        </h1>

        <p className="text-gray-300 mt-6 text-lg leading-relaxed">
          {hero.subtitle}
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => scrollToSection("projects")}
            className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-lg font-medium shadow-lg shadow-indigo-500/40 transition"
          >
            {hero.primaryCtaLabel}
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-3 border border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-slate-900 rounded-xl text-lg font-medium transition"
          >
            {hero.secondaryCtaLabel}
          </button>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="mt-12 md:mt-0">
        {hero.heroImageUrl ? (
          <img
            src={hero.heroImageUrl}
            alt="Hero"
            className="w-80 h-80 object-cover rounded-3xl shadow-2xl shadow-indigo-600/40"
          />
        ) : (
          <div className="w-80 h-80 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-3xl shadow-2xl shadow-indigo-600/40 animate-pulse" />
        )}
      </div>
    </section>
  );
}

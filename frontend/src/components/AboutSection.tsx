// src/components/AboutSection.tsx
import type { AboutSettings } from "../services/settingsApi";
import type { HeroSettings } from "../services/settingsApi";


interface AboutProps {
  about: AboutSettings;
}

export default function AboutSection({ about }: AboutProps) {
  return (
    <section id="about" data-scroll-section className="px-10 md:px-20 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">{about.headline}</h2>

      <p className="text-gray-300 max-w-3xl leading-relaxed text-lg mb-10">
        {about.description}
      </p>

      <h3 className="text-2xl font-semibold mb-4">Skills</h3>

      <div className="flex flex-wrap gap-4 mb-16">
        {about.skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 bg-slate-800 rounded-xl text-indigo-300 shadow shadow-indigo-500/10"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

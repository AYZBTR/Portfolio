import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import FeaturedProjects from "../components/FeaturedProjects";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";

import { fetchSiteSettings } from "../services/settingsApi";
import type { SiteSettings } from "../services/settingsApi";

import { useScroll } from "../contexts/ScrollContext";

export default function Home() {
  const { updateScroll } = useScroll();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSiteSettings();
        setSettings(data);
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setLoading(false);

        // force locomotive to recalc after content loads
        setTimeout(updateScroll, 100);
        setTimeout(updateScroll, 300);
        setTimeout(updateScroll, 600);
      }
    };

    load();
  }, [updateScroll]);

  if (loading || !settings) {
    return (
      <div className="pt-20 text-center text-slate-300">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* Each component renders its own <section id="..."> with data-scroll-section */}
      <Hero hero={settings.hero} />
      <FeaturedProjects />
      <AboutSection about={settings.about} />
      <ContactSection contact={settings.contact} />
    </>
  );
}

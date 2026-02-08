import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import FeaturedProjects from "../components/FeaturedProjects";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";

import { fetchSiteSettings } from "../services/settingsApi";
import type { SiteSettings } from "../services/settingsApi";

import { useScroll } from "../contexts/ScrollContext";

// Default settings to show immediately while API loads
const DEFAULT_SETTINGS: SiteSettings = {
  hero: {
    name: "Aayush Bhattarai",
    title: "Full Stack Developer",
    subtitle: "Building amazing web experiences",
    primaryCtaLabel: "View Projects",
    secondaryCtaLabel: "Contact Me",
    heroImageUrl: ""
  },
  about: {
    headline: "About Me",
    description: "Passionate developer focused on creating beautiful and functional web applications.",
    skills: ["React", "TypeScript", "Node.js", "MongoDB"]
  },
  contact: {
    email: "contact@example.com",
    location: "Your Location",
    socialLinks: []
  }
};

export default function Home() {
  const { updateScroll } = useScroll();
  // Start with default settings instead of null
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isLoadingFromAPI, setIsLoadingFromAPI] = useState(true);
  const [showWarmUpMessage, setShowWarmUpMessage] = useState(false);

  useEffect(() => {
    // Show warm-up message after 3 seconds if still loading
    const warmUpTimer = setTimeout(() => {
      if (isLoadingFromAPI) {
        setShowWarmUpMessage(true);
      }
    }, 3000);

    const load = async () => {
      try {
        const data = await fetchSiteSettings();
        setSettings(data);
        setShowWarmUpMessage(false);
      } catch (err) {
        console.error("Failed to load settings", err);
        // Keep showing default settings on error
      } finally {
        setIsLoadingFromAPI(false);
        clearTimeout(warmUpTimer);

        // force locomotive to recalc after content loads
        setTimeout(updateScroll, 100);
        setTimeout(updateScroll, 300);
        setTimeout(updateScroll, 600);
      }
    };

    load();

    return () => clearTimeout(warmUpTimer);
  }, [updateScroll]);

  return (
    <>
      {/* Show warm-up notification if backend is spinning up */}
      {showWarmUpMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-blue-500/90 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
          <div className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading latest content from server...</span>
          </div>
        </div>
      )}

      {/* Show content immediately with default or loaded settings */}
      <Hero hero={settings.hero} />
      <FeaturedProjects />
      <AboutSection about={settings.about} />
      <ContactSection contact={settings.contact} />
    </>
  );
}
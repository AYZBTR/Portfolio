import { useEffect } from "react";
import Hero from "../components/Hero";
import FeaturedProjects from "../components/FeaturedProjects";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import { useScroll } from "../contexts/ScrollContext";

export default function Home() {
  const { updateScroll } = useScroll();

  useEffect(() => {
    // Multiple update calls to ensure content is properly measured
    const timeouts = [
      setTimeout(updateScroll, 50),
      setTimeout(updateScroll, 200),
      setTimeout(updateScroll, 500),
      setTimeout(updateScroll, 1000)
    ];

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [updateScroll]);

  return (
    <div className="pt-20">
      <section id="hero" data-scroll-section>
        <Hero />
      </section>

      <section id="projects" data-scroll-section>
        <FeaturedProjects />
      </section>

      <section id="about" data-scroll-section>
        <AboutSection />
      </section>

      <section id="contact" data-scroll-section>
        <ContactSection />
      </section>
    </div>
  );
}
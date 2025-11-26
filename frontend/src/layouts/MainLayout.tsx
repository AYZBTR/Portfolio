import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import ScrollProvider from "../contexts/ScrollContext";

import { Home, Briefcase, User, Mail } from "lucide-react";

function MainLayoutContent() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const locoScrollRef = useRef<InstanceType<typeof LocomotiveScroll> | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // hide navbar on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Helper to remove locomotive-added classes and scrollbar DOM nodes
  const cleanupLocomotiveClasses = () => {
    document.documentElement.classList.remove(
      "has-scroll-smooth",
      "has-scroll-init",
      "has-scroll-scrolling",
      "has-scroll-dragging"
    );
    document.body.classList.remove("has-scroll-smooth");

    document.querySelectorAll(".c-scrollbar, .c-scrollbar__track, .c-scrollbar__thumb").forEach((el) =>
      el.remove()
    );
  };

  // Initialize locomotive once on mount, destroy on unmount
  useEffect(() => {
    if (!scrollRef.current) return;

    // Hide native scroll while Locomotive controls it
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const initTimer = setTimeout(() => {
      if (!locoScrollRef.current && scrollRef.current) {
        locoScrollRef.current = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          lerp: 0.1,
          multiplier: 1,
          smartphone: { smooth: true },
          tablet: { smooth: true },
        });

        // a couple of delayed updates to ensure correct sizing
        setTimeout(() => locoScrollRef.current?.update(), 200);
        setTimeout(() => locoScrollRef.current?.update(), 600);
      }
    }, 120);

    return () => {
      clearTimeout(initTimer);

      try {
        locoScrollRef.current?.destroy();
      } catch (e) {
        // ignore errors during destroy, but log for debugging
        // console.warn("Error destroying locomotive", e);
      }
      locoScrollRef.current = null;

      cleanupLocomotiveClasses();

      // restore native overflow styles (clear inline styles)
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
    // run once on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ensure loco updates when route changes / content changes
  useEffect(() => {
    if (locoScrollRef.current) {
      // small delay helps if content is injected immediately after navigation
      setTimeout(() => locoScrollRef.current?.update(), 60);
      setTimeout(() => locoScrollRef.current?.update(), 300);
    }
  }, [location.pathname]);

  const updateScroll = () => {
    locoScrollRef.current?.update();
  };

  // Smooth scroll to section (do nothing on admin since navbar is hidden)
  const scrollToSection = (id: string) => {
    if (isAdminRoute) return;

    setMobileMenuOpen(false); // close mobile menu

    const scrollNow = () => {
      const target = document.getElementById(id);
      if (target && locoScrollRef.current) {
        locoScrollRef.current.update();
        locoScrollRef.current.scrollTo(target, {
          offset: -100,
          duration: 1200,
          easing: [0.25, 0.0, 0.35, 1.0],
        });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollNow, 900);
    } else {
      setTimeout(scrollNow, 200);
    }
  };

  return (
    <>
      {/* NAVBAR - removed on admin routes */}
      {!isAdminRoute && (
        <header className="fixed top-0 left-0 w-full z-[100] bg-slate-900/80 backdrop-blur border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-white">
              Aayush<span className="text-indigo-400">.</span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-6 text-white">
              <button onClick={() => scrollToSection("hero")}>Home</button>
              <button onClick={() => scrollToSection("projects")}>Projects</button>
              <button onClick={() => scrollToSection("about")}>About</button>
              <button onClick={() => scrollToSection("contact")}>Contact</button>
            </nav>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen((p) => !p)}
                className="text-white text-4xl px-4 py-2 rounded"
              >
                {mobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Smooth Fade Overlay - hidden on admin */}
      {!isAdminRoute && (
        <div
          className={`
            md:hidden fixed inset-0 z-[90]
            bg-black/60 backdrop-blur-sm
            transition-opacity duration-300 ease-out
            ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu - hidden on admin */}
      {!isAdminRoute && (
        <div
          className={`
            md:hidden fixed top-16 left-0 right-0 z-[95]
            bg-slate-900/98 backdrop-blur-xl shadow-xl
            border-b border-slate-700/50
            transform transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
          `}
        >
          <div className="flex flex-col items-center py-8 gap-6 px-6 max-h-[50vh] overflow-y-auto">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-4 w-full max-w-xs text-gray-300 hover:text-indigo-400 transition-all"
            >
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 shadow">
                <Home size={26} />
              </div>
              <span className="text-lg font-medium">Home</span>
            </button>

            <button
              onClick={() => scrollToSection("projects")}
              className="flex items-center gap-4 w-full max-w-xs text-gray-300 hover:text-indigo-400 transition-all"
            >
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 shadow">
                <Briefcase size={26} />
              </div>
              <span className="text-lg font-medium">Projects</span>
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="flex items-center gap-4 w-full max-w-xs text-gray-300 hover:text-indigo-400 transition-all"
            >
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 shadow">
                <User size={26} />
              </div>
              <span className="text-lg font-medium">About</span>
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center gap-4 w-full max-w-xs text-gray-300 hover:text-indigo-400 transition-all"
            >
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 shadow">
                <Mail size={26} />
              </div>
              <span className="text-lg font-medium">Contact</span>
            </button>
          </div>
        </div>
      )}

      {/* LOCOMOTIVE SCROLL CONTAINER - all routes (including /admin) render inside here */}
      <div ref={scrollRef} data-scroll-container className="min-h-screen bg-slate-900 text-white">
        <ScrollProvider updateScroll={updateScroll} scrollToSection={scrollToSection}>
          <Outlet />
        </ScrollProvider>
      </div>
    </>
  );
}

export default MainLayoutContent;
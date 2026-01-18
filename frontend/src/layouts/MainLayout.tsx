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
  const [scrolled, setScrolled] = useState(false);

  // hide navbar on admin routes and project detail pages
  const adminBase = import.meta.env.VITE_ADMIN_BASE || '/admin';
  const isAdminRoute = location.pathname.startsWith(adminBase);
  const isProjectDetailPage = location.pathname.startsWith("/projects/");
  const hideNavbar = isAdminRoute || isProjectDetailPage;

  // Helper to remove locomotive-added classes and scrollbar DOM nodes
  const cleanupLocomotiveClasses = () => {
    document. documentElement.classList.remove(
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
    if (! scrollRef.current) return;

    // 🔥 DETECT MOBILE DEVICE
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

    // Hide native scroll while Locomotive controls it (only on desktop)
    if (!isMobile) {
      document. documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    const initTimer = setTimeout(() => {
      if (! locoScrollRef.current && scrollRef.current) {
        locoScrollRef.current = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: ! isMobile, // ✅ Disable smooth scroll on mobile
          lerp: 0.1,
          multiplier: 1,
          smartphone: { 
            smooth: false // ✅ Use native mobile scroll
          },
          tablet:  { 
            smooth: false // ✅ Use native tablet scroll
          },
        });

        // Listen to scroll events for navbar background change
        locoScrollRef.current.on("scroll", (args:  any) => {
          setScrolled(args.scroll. y > 50);
        });

        // a couple of delayed updates to ensure correct sizing
        setTimeout(() => locoScrollRef.current?. update(), 200);
        setTimeout(() => locoScrollRef.current?.update(), 600);
      }
    }, 120);

    return () => {
      clearTimeout(initTimer);

      try {
        locoScrollRef. current?.destroy();
      } catch (e) {
        // ignore errors during destroy
      }
      locoScrollRef.current = null;

      cleanupLocomotiveClasses();

      // restore native overflow styles
      document.documentElement.style.overflow = "";
      document. body.style.overflow = "";
    };
  }, []);

  // Ensure loco updates when route changes / content changes
  useEffect(() => {
    if (locoScrollRef.current) {
      setTimeout(() => locoScrollRef.current?. update(), 60);
      setTimeout(() => locoScrollRef.current?.update(), 300);
    }
  }, [location.pathname]);

  const updateScroll = () => {
    locoScrollRef.current?.update();
  };

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    if (hideNavbar) return;

    setMobileMenuOpen(false); // close mobile menu

    const scrollNow = () => {
      const target = document.getElementById(id);
      if (target && locoScrollRef.current) {
        locoScrollRef.current. update();
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

  const navLinks = [
    { name:  "Home", id: "hero", icon: Home },
    { name: "Projects", id: "projects", icon: Briefcase },
    { name: "About", id: "about", icon:  User },
    { name: "Contact", id: "contact", icon: Mail },
  ];

  return (
    <>
      {/* ENHANCED NAVBAR */}
      {!hideNavbar && (
        <header
          className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
            scrolled
              ? "bg-slate-900/90 backdrop-blur-xl border-b border-indigo-500/20 shadow-2xl shadow-indigo-500/10"
              :  "bg-slate-900/60 backdrop-blur-md border-b border-slate-700/40"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
            <div className="flex justify-between items-center h-20">
              {/* LOGO */}
              <Link to="/" className="flex items-center gap-3 group">
                {/* Animated logo icon */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-white text-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    A
                  </div>
                </div>
              </Link>

              {/* DESKTOP MENU */}
              <div className="hidden md:flex items-center gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="relative px-5 py-2. 5 rounded-xl font-medium text-gray-300 hover:text-white transition-all duration-300 group"
                  >
                    {/* Hover background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    
                    {/* Text */}
                    <span className="relative z-10 flex items-center gap-2">
                      <link.icon size={18} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
                      {link.name}
                    </span>
                    
                    {/* Bottom indicator on hover */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0. 5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full group-hover:w-3/4 transition-all duration-300"></span>
                  </button>
                ))}
              </div>

              {/* MOBILE BURGER ICON */}
              <button
                className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1. 5 group z-[10000]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span
                  className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* MOBILE MENU OVERLAY */}
      {!hideNavbar && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* MOBILE SLIDE-OUT MENU */}
      {! hideNavbar && (
        <div
          className={`
            md:hidden fixed top-0 right-0 h-full w-72 bg-slate-900/98 backdrop-blur-xl
            border-l border-indigo-500/20 shadow-2xl shadow-indigo-500/10
            transform transition-all duration-500 ease-out z-[9999]
            ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Close button in mobile menu */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-3xl">✕</span>
          </button>

          {/* Menu items */}
          <div className="flex flex-col items-center mt-24 gap-6 px-6">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full group animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 transform hover:scale-105">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/50 transition-shadow">
                    <link.icon size={24} strokeWidth={2} className="text-white" />
                  </div>

                  {/* Text */}
                  <span className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors">
                    {link.name}
                  </span>
                </div>
              </button>
            ))}

            {/* CTA in mobile menu */}
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-bold text-white shadow-xl shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300"
            >
              Let's Work Together
            </button>
          </div>

          {/* Decorative gradient at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-600/20 to-transparent pointer-events-none"></div>
        </div>
      )}

      {/* LOCOMOTIVE SCROLL CONTAINER */}
      <div ref={scrollRef} data-scroll-container className="min-h-screen bg-slate-900 text-white">
        <ScrollProvider updateScroll={updateScroll} scrollToSection={scrollToSection}>
          <Outlet />
        </ScrollProvider>
      </div>
    </>
  );
}

export default MainLayoutContent;
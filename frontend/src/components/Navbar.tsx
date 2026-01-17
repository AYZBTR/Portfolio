import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Home,
  FolderKanban,
  UserRound,
  Mail
} from "lucide-react";

// allow window. locoScroll
declare global {
  interface Window {
    locoScroll: unknown;
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  // Detect scroll for glassmorphic effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler compatible with LocomotiveScroll
  const scrollToSection = (id: string) => {
    const scroll = () => {
      const el = document.getElementById(id);
      if (! el) return;

      if (window.locoScroll) {
        window.locoScroll. update();
        window.locoScroll.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (! isHome) {
      navigate("/");
      setTimeout(scroll, 450);
    } else {
      setTimeout(scroll, 50);
    }

    setOpen(false);
  };

  const navLinks = [
    { name: "Home", id: "hero", icon: Home },
    { name: "Projects", id: "projects", icon: FolderKanban },
    { name: "About", id: "about", icon: UserRound },
    { name: "Contact", id: "contact", icon: Mail },
  ];

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-[999] transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-xl border-b border-indigo-500/20 shadow-2xl shadow-indigo-500/10"
          : "bg-slate-900/60 backdrop-blur-md border-b border-slate-700/40"
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

            {/* Brand name */}
            <span className="text-2xl md:text-3xl font-extrabold tracking-wide">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                sdhfsdhfkjsdhf
              </span>
              <span className="text-white">. </span>
            </span>
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

            {/* Optional CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e. preventDefault();
                scrollToSection("contact");
              }}
              className="ml-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/50 transform hover:scale-105 transition-all duration-200"
            >
              Let's Talk
            </a>
          </div>

          {/* MOBILE BURGER ICON */}
          <button
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group z-[10000]"
            onClick={() => setOpen(!open)}
          >
            <span
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                open ?  "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                open ?  "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-OUT MENU */}
      <div
        data-scroll="false"
        className={`
          fixed top-0 right-0 h-full w-72 bg-slate-900/98 backdrop-blur-xl
          border-l border-indigo-500/20 shadow-2xl shadow-indigo-500/10
          transform transition-all duration-500 ease-out z-[9999]
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Close button in mobile menu */}
        <button
          onClick={() => setOpen(false)}
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
            className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover: to-purple-700 rounded-xl font-bold text-white shadow-xl shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300"
          >
            Let's Work Together
          </button>
        </div>

        {/* Decorative gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-600/20 to-transparent pointer-events-none"></div>
      </div>

      {/* Overlay when mobile menu is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </nav>
  );
}
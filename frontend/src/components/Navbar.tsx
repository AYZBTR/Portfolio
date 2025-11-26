import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  FolderKanban,
  UserRound,
  Mail
} from "lucide-react";


// allow window.locoScroll
declare global {
  interface Window {
    locoScroll: any;
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  // Smooth scroll handler compatible with LocomotiveScroll
  const scrollToSection = (id: string) => {
    const scroll = () => {
      const el = document.getElementById(id);
      if (!el) return;

      if (window.locoScroll) {
        window.locoScroll.update();
        window.locoScroll.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (!isHome) {
      navigate("/");
      setTimeout(scroll, 450);
    } else {
      setTimeout(scroll, 50);
    }

    setOpen(false);
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-[999] bg-slate-900/80 backdrop-blur border-b border-slate-700/40 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-extrabold text-indigo-400 tracking-wide">
          Aayush<span className="text-white">.</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-gray-300 font-medium text-lg items-center">
          <button onClick={() => scrollToSection("hero")} className="hover:text-indigo-400 transition">
            Home
          </button>

          <button onClick={() => scrollToSection("projects")} className="hover:text-indigo-400 transition">
            Projects
          </button>

          <button onClick={() => scrollToSection("about")} className="hover:text-indigo-400 transition">
            About
          </button>

          <button onClick={() => scrollToSection("contact")} className="hover:text-indigo-400 transition">
            Contact
          </button>
        </div>

        {/* MOBILE BURGER ICON */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE SLIDE-OUT MENU */}
<div
  data-scroll="false"
  className={`
    fixed top-0 right-0 h-full w-52 bg-slate-900/95 border-l border-slate-700/40
    shadow-xl transform transition-transform duration-300 z-[9999]
    ${open ? "translate-x-0" : "translate-x-full"}
  `}
>
  <div className="flex flex-col items-center mt-28 gap-10">

    {/* HOME */}
    <button
      onClick={() => scrollToSection("hero")}
      className="flex flex-col items-center text-gray-300 hover:text-indigo-400 transition"
    >
      <div className="p-4 bg-white/5 rounded-xl border border-white/10 shadow">
        <Home size={26} strokeWidth={1.6} />
      </div>
      <span className="text-base mt-2">Home</span>
    </button>

    {/* PROJECTS */}
    <button
      onClick={() => scrollToSection("projects")}
      className="flex flex-col items-center text-gray-300 hover:text-indigo-400 transition"
    >
      <div className="p-4 bg-white/5 rounded-xl border border-white/10 shadow">
        <FolderKanban size={26} strokeWidth={1.6} />
      </div>
      <span className="text-base mt-2">Projects</span>
    </button>

    {/* ABOUT */}
    <button
      onClick={() => scrollToSection("about")}
      className="flex flex-col items-center text-gray-300 hover:text-indigo-400 transition"
    >
      <div className="p-4 bg-white/5 rounded-xl border border-white/10 shadow">
        <UserRound size={26} strokeWidth={1.6} />
      </div>
      <span className="text-base mt-2">About</span>
    </button>

    {/* CONTACT */}
    <button
      onClick={() => scrollToSection("contact")}
      className="flex flex-col items-center text-gray-300 hover:text-indigo-400 transition"
    >
      <div className="p-4 bg-white/5 rounded-xl border border-white/10 shadow">
        <Mail size={26} strokeWidth={1.6} />
      </div>
      <span className="text-base mt-2">Contact</span>
    </button>

  </div>
</div>

    </nav>
  );
}

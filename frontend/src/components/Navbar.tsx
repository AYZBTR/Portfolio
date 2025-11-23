import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (section: string) => {
    // If we are already on "/", just scroll
    if (location.pathname === "/") {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } 
    else {
      // Navigate home first, then scroll AFTER page loads
      navigate("/");

      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }

    setOpen(false);
  };

  return (
    <nav className="w-full bg-slate-900/80 backdrop-blur-md fixed top-0 left-0 z-50 border-b border-slate-700/40">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-indigo-400">
          Aayush<span className="text-white">.</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-lg text-gray-300 font-medium">

          <Link to="/" className="hover:text-indigo-400">Home</Link>

          <button onClick={() => handleScroll("projects")} className="hover:text-indigo-400">
            Projects
          </button>

          <button onClick={() => handleScroll("about")} className="hover:text-indigo-400">
            About
          </button>

          <button onClick={() => handleScroll("contact")} className="hover:text-indigo-400">
            Contact
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden text-white text-3xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-slate-800 px-6 py-4 space-y-4">
          <Link to="/" onClick={() => setOpen(false)} className="block text-lg text-gray-200">Home</Link>

          <button onClick={() => handleScroll("projects")} className="block text-lg text-gray-200">
            Projects
          </button>

          <button onClick={() => handleScroll("about")} className="block text-lg text-gray-200">
            About
          </button>

          <button onClick={() => handleScroll("contact")} className="block text-lg text-gray-200">
            Contact
          </button>
        </div>
      )}
    </nav>
  );
}

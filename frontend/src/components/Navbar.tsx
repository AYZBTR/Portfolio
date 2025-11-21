import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Projects", path: "/projects" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full bg-slate-900/80 backdrop-blur-md fixed top-0 left-0 z-50 border-b border-slate-700/40">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-indigo-400">
          Aayush<span className="text-white">.</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-8 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              className="text-gray-300 hover:text-indigo-400 transition font-medium"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-slate-800 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block text-gray-200 py-2 text-lg hover:text-indigo-400 transition"
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

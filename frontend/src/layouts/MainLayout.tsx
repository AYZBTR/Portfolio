// layouts/MainLayout.tsx

import { useEffect, useRef } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import ScrollProvider from "../contexts/ScrollContext";

function MainLayoutContent() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locoScrollRef = useRef<InstanceType<typeof LocomotiveScroll> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to manually update the scroll
  const updateScroll = () => {
    if (locoScrollRef.current) {
      locoScrollRef.current.update();
    }
  };

  // INIT LOCOMOTIVE SCROLL
  useEffect(() => {
    if (!scrollRef.current) return;

    // Small delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      if (scrollRef.current && !locoScrollRef.current) {
        locoScrollRef.current = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          lerp: 0.1,
          multiplier: 1,
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
          },
        });

        console.log("Locomotive Scroll initialized");

        // Force multiple updates to ensure content is measured
        setTimeout(() => locoScrollRef.current?.update(), 100);
        setTimeout(() => locoScrollRef.current?.update(), 300);
        setTimeout(() => locoScrollRef.current?.update(), 600);
        setTimeout(() => locoScrollRef.current?.update(), 1000);
      }
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(initTimer);
      if (locoScrollRef.current) {
        console.log("Destroying Locomotive Scroll");
        locoScrollRef.current.destroy();
        locoScrollRef.current = null;
      }
    };
  }, []);

  // Update on route change
  useEffect(() => {
    if (locoScrollRef.current && location.pathname === "/") {
      setTimeout(() => {
        locoScrollRef.current?.update();
      }, 200);
    }
  }, [location.pathname]);

  // SMOOTH SCROLLING
  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (locoScrollRef.current) {
          locoScrollRef.current.update();
          setTimeout(() => {
            const target = document.querySelector(`#${id}`);
            if (target) {
              locoScrollRef.current?.scrollTo(target, {
                duration: 1200,
                offset: -100,
                easing: [0.25, 0.0, 0.35, 1.0],
              });
            }
          }, 100);
        }
      }, 800);
    } else {
      if (locoScrollRef.current) {
        locoScrollRef.current.update();
        const target = document.querySelector(`#${id}`);
        if (target) {
          locoScrollRef.current.scrollTo(target, {
            duration: 1200,
            offset: -100,
            easing: [0.25, 0.0, 0.35, 1.0],
          });
        }
      }
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-white">
            Aayush<span className="text-indigo-400">.</span>
          </Link>

          <nav className="flex items-center gap-6 text-white">
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-indigo-400 transition"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="hover:text-indigo-400 transition"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-indigo-400 transition"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-indigo-400 transition"
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* SCROLL CONTAINER */}
      <div
        data-scroll-container
        ref={scrollRef}
        className="bg-slate-900 text-white"
      >
        <ScrollProvider updateScroll={updateScroll} scrollToSection={scrollToSection}>
  <Outlet />
</ScrollProvider>

      </div>
    </>
  );
}

export default MainLayoutContent;

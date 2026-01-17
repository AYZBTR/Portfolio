import { useScroll } from "../contexts/ScrollContext";
import type { HeroSettings } from "../services/settingsApi";
import { SiReact, SiNodedotjs, SiMongodb, SiTypescript, SiAmazon, SiCisco } from "react-icons/si";

interface HeroProps {
  hero: HeroSettings;
}

export default function Hero({ hero }: HeroProps) {
  const { scrollToSection } = useScroll();

  return (
    <section
      id="hero"
      data-scroll-section
      className="min-h-screen flex items-center justify-center px-6 md:px-20 py-20 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT SIDE */}
        <div className="space-y-6 animate-fadeIn">
          <div className="inline-block px-4 py-2 bg-indigo-500/20 rounded-full border border-indigo-500/30 backdrop-blur-sm">
            <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase">
              {hero.title || "Full-Stack Developer"}
            </p>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            <span className="text-white">Hi, I'm </span>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              {hero.name || "Aayush Bhattarai"}
            </span>
            <span className="text-white">. </span>
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-300">
  {hero.subtitle || "I build modern web apps & secure networks. "}
</h2>

<p className="text-xl text-gray-400 max-w-xl leading-relaxed">
  Tech enthusiast driven by curiosity and passion for innovation.  I believe 
  <span className="text-indigo-400 font-semibold"> there's no limit to knowledge</span> — 
  deeply interested in machines, networks, and how technology transforms ideas into reality.  
  From code to circuits, <span className="text-cyan-400 font-semibold">I explore it all</span>. 
</p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-semibold text-white shadow-xl shadow-indigo-500/50 transform hover:scale-105 transition-all duration-200"
            >
              {hero.primaryCtaLabel || "View Projects"}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border-2 border-indigo-400/50 hover:border-indigo-400 rounded-xl font-semibold text-white backdrop-blur-sm transform hover:scale-105 transition-all duration-200"
            >
              {hero.secondaryCtaLabel || "Contact Me"}
            </button>
          </div>
          
          {/* Tech Stack Icons */}
          <div className="flex gap-6 pt-8 items-center flex-wrap">
            <p className="text-gray-400 font-medium">Tech Stack: </p>
            <div className="flex gap-4 flex-wrap">
              <div className="group relative" title="React">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 hover:border-cyan-500 transition-colors cursor-pointer">
                  <SiReact className="text-2xl text-cyan-400" />
                </div>
              </div>
              <div className="group relative" title="Node.js">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 hover:border-green-500 transition-colors cursor-pointer">
                  <SiNodedotjs className="text-2xl text-green-500" />
                </div>
              </div>
              <div className="group relative" title="MongoDB">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 hover: border-green-600 transition-colors cursor-pointer">
                  <SiMongodb className="text-2xl text-green-600" />
                </div>
              </div>
              <div className="group relative" title="TypeScript">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
                  <SiTypescript className="text-2xl text-blue-500" />
                </div>
              </div>
              <div className="group relative" title="AWS">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 hover: border-orange-500 transition-colors cursor-pointer">
                  <SiAmazon className="text-2xl text-orange-500" />
                </div>
              </div>
              <div className="group relative" title="Cisco">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 hover:border-blue-600 transition-colors cursor-pointer">
                  <SiCisco className="text-2xl text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* RIGHT SIDE - Profile */}
        <div className="relative animate-fadeIn delay-300">
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-40 animate-pulse"></div>
            
            {/* Main container */}
            <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl overflow-hidden shadow-2xl border border-indigo-500/30">
              {hero.heroImageUrl ?  (
                <img
                  src={hero.heroImageUrl}
                  alt={hero.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
                  <div className="text-center p-8">
                    <div className="text-9xl mb-6 animate-bounce">👨‍💻</div>
                    <p className="text-white text-3xl font-bold">Full-Stack</p>
                    <p className="text-indigo-200 text-xl">Network Engineer</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Floating tech badges */}
            <div className="absolute -top-6 -left-6 bg-gray-800/90 backdrop-blur-sm px-5 py-3 rounded-xl border border-indigo-500/50 shadow-xl animate-float">
              <p className="text-sm font-bold text-indigo-400">⚛️ MERN Stack</p>
            </div>

            <div className="absolute top-10 -right-6 bg-gray-800/90 backdrop-blur-sm px-5 py-3 rounded-xl border border-cyan-500/50 shadow-xl animate-float delay-200">
              <p className="text-sm font-bold text-cyan-400">🔒 Cisco Networking</p>
            </div>

            <div className="absolute bottom-1/3 -left-8 bg-gray-800/90 backdrop-blur-sm px-5 py-3 rounded-xl border border-orange-500/50 shadow-xl animate-float delay-400">
              <p className="text-sm font-bold text-orange-400">☁️ Cloud</p>
            </div>

            <div className="absolute -bottom-6 left-16 bg-gray-800/90 backdrop-blur-sm px-5 py-3 rounded-xl border border-green-500/50 shadow-xl animate-float delay-500">
              <p className="text-sm font-bold text-green-400">🌐 IoT</p>
            </div>

            <div className="absolute top-1/4 -right-10 bg-gray-800/90 backdrop-blur-sm px-5 py-3 rounded-xl border border-purple-500/50 shadow-xl animate-float delay-300">
              <p className="text-sm font-bold text-purple-400">🔐 Security</p>
            </div>

            <div className="absolute -bottom-10 right-20 bg-gray-800/90 backdrop-blur-sm px-5 py-3 rounded-xl border border-pink-500/50 shadow-xl animate-float delay-700">
              <p className="text-sm font-bold text-pink-400">✨ And More...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
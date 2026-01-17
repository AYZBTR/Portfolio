import { Code2, Rocket, Award, Network, Github, Linkedin, Mail, GraduationCap } from "lucide-react";
import type { AboutSettings } from "../services/settingsApi";

interface AboutSectionProps {
  about: AboutSettings;
}

export default function AboutSection({ about }:  AboutSectionProps) {
  // Use skills from settings, fallback to defaults if empty
  const skills = about.skills && about.skills.length > 0 
    ? about.skills 
    : [
        "React", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL",
        "Python", "C++", "JavaScript", "TailwindCSS", "AWS", "Azure",
        "Docker", "Git", "CI/CD", "Jenkins", "GitLab", "REST APIs",
        "Cisco CCNA", "Network Security", "IoT", "Linux", "Agile/Scrum"
      ];

  const stats = [
    { icon: Code2, label: "GitHub Repos", value: "20+", color: "from-indigo-600 to-purple-600" },
    { icon: Rocket, label: "Years Experience", value: "3+", color: "from-purple-600 to-pink-600" },
    { icon: Award, label: "Certifications", value: "10+", color: "from-pink-600 to-red-600" },
    { icon: Network, label: "Projects Completed", value: "15+", color: "from-cyan-600 to-blue-600" },
  ];

  const certifications = [
    { name:  "Cisco CCNA - Switching, Routing & Wireless", year: "2022", icon: "🔒" },
    { name: "Cisco CCNA - Enterprise Networking & Security", year: "2023", icon: "🛡️" },
    { name: "AWS Academy Cloud Foundations", year: "2023", icon: "☁️" },
    { name: "Complete Web Development Bootcamp", year: "2024", icon: "💻" },
    { name: "Cisco Network Security", year: "2023", icon: "🔐" },
    { name: "Model Driven Programmability (RESTCONF)", year: "2023", icon: "🤖" },
  ];

  const socialLinks = [
    { icon:  Github, href: "https://github.com/AYZBTR", label: "GitHub", color: "hover:text-purple-400" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ayzbtr/", label: "LinkedIn", color:  "hover:text-blue-400" },
    { icon: Mail, href: "mailto: bhattaraiaayush. 78@gmail.com", label: "Email", color: "hover:text-indigo-400" },
  ];

  return (
    <section
      id="about"
      data-scroll-section
      className="px-6 md:px-20 py-20 bg-gradient-to-b from-gray-900/50 to-transparent relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-block px-4 py-2 bg-indigo-500/20 rounded-full border border-indigo-500/30 backdrop-blur-sm mb-4">
            <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase">
              Get To Know Me
            </p>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {about.headline || "About Me"}
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          {/* Left:  Story */}
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover: border-indigo-500/50 transition-all duration-300">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  👨‍💻
                </span>
                My Story
              </h3>
              <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                {about.description || "I'm a passionate Full-Stack & Network Engineer focused on building modern, fast, and scalable web applications. "}
              </div>
            </div>

            {/* Education */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <GraduationCap size={24} className="text-indigo-400" />
                Education
              </h4>
              <div className="space-y-4">
                <div className="border-l-2 border-indigo-500 pl-4">
                  <p className="text-white font-semibold">Information Technology Engineering</p>
                  <p className="text-gray-400 text-sm">South-Eastern Finland University</p>
                  <p className="text-gray-500 text-xs">2021 - Present</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-4">
                  <p className="text-white font-semibold">XII (NEB) - Secondary School</p>
                  <p className="text-gray-400 text-sm">The New Summit, Kathmandu, Nepal</p>
                  <p className="text-gray-500 text-xs">2018 - 2020</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h4 className="text-xl font-bold text-white mb-4">Connect With Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social. href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 p-4 bg-gray-700/50 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 rounded-lg border border-gray-600 hover:border-indigo-500/50 transition-all duration-300 group`}
                    title={social.label}
                  >
                    <social.icon size={20} className={`text-gray-400 ${social.color} transition-colors`} />
                    <span className="text-gray-300 group-hover:text-white transition-colors font-medium text-sm">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Stats & Certifications */}
          <div className="space-y-6 animate-fadeIn delay-200">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1 group animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Certifications Showcase */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award size={24} className="text-indigo-400" />
                Key Certifications
              </h4>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 transition-all group"
                  >
                    <span className="text-2xl">{cert.icon}</span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold group-hover:text-indigo-400 transition-colors">
                        {cert.name}
                      </p>
                      <p className="text-gray-500 text-xs">{cert.year}</p>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-2">
                  <p className="text-indigo-400 text-sm font-semibold">+ 4 more certifications</p>
                </div>
              </div>
            </div>

            {/* Download Resume */}
            <a
              href="/resume.pdf"
              download
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-bold text-white shadow-xl shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300"
            >
              <Award size={20} />
              Download Resume
            </a>
          </div>
        </div>

        {/* Skills Section */}
        <div className="animate-fadeIn delay-300">
          <h3 className="text-3xl font-bold text-center text-white mb-8">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className="px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 hover: border-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 transition-all duration-300 transform hover:scale-110 group animate-fadeIn"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <span className="text-gray-300 group-hover:text-white font-medium transition-colors">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
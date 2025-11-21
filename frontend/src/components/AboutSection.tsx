export default function AboutSection() {
  const skills = [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "TailwindCSS",
    "TypeScript",
    "JavaScript",
    "Git",
    "Linux",
  ];

  return (
    <section className="px-10 md:px-20 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>

      <p className="text-gray-300 max-w-3xl leading-relaxed text-lg mb-10">
        I'm a passionate Full-Stack Developer who loves building scalable,
        modern, and visually appealing web applications. I work mainly with the
        MERN stack and enjoy creating both frontend experiences and backend
        systems with clean architecture.
      </p>

      {/* SKILLS */}
      <h3 className="text-2xl font-semibold mb-4">Skills</h3>
      <div className="flex flex-wrap gap-4 mb-16">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 bg-slate-800 rounded-xl text-indigo-300 shadow shadow-indigo-500/10"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* EXPERIENCE */}
      <h3 className="text-2xl font-semibold mb-4">Experience</h3>
      <div className="space-y-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-slate-800 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold">Role / Company</h3>
            <p className="text-gray-400 text-sm">2022 – Present</p>
            <p className="mt-3 text-gray-300">
              Description of work, achievements, responsibilities, and
              technologies used.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

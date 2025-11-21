export default function FeaturedProjects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      desc: "A full MERN e-commerce app with admin dashboard, Stripe payments, and product management.",
    },
    {
      title: "Portfolio CMS",
      desc: "A personal portfolio system with admin panel, CRUD operations, and dynamic project content.",
    },
    {
      title: "Real-Time Chat App",
      desc: "Socket.io powered real-time chat with private rooms, notifications, and online status.",
    },
  ];

  return (
    <section className="px-10 md:px-20 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-10">Featured Projects</h2>

      <div className="grid md:grid-cols-3 gap-10">
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-slate-800 p-6 rounded-2xl shadow-xl hover:scale-[1.02] hover:shadow-indigo-500/30 transition duration-300"
          >
            <div className="h-40 bg-slate-700 rounded-xl mb-4"></div>

            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              {project.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

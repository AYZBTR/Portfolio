import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import type { Project } from "../services/projectService";
import { Link } from "react-router-dom";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadProjects = async () => {
      try {
        const data = await getProjects();
        if (!mounted) return;
        setProjects(data);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    loadProjects();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="projects"
      data-scroll-section
      className="px-10 md:px-20 py-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Featured Projects
          </h2>

          {loading && (
            <div className="flex items-center gap-3 text-sm text-blue-200 bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg">
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-300" />
              Loading projects…
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && projects.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden"
              >
                <div className="h-48 bg-gray-700/40 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-2/3 bg-gray-700/40 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-700/30 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-700/30 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Real content */}
        {!loading && projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📂</div>
            <p className="text-gray-400 text-2xl mb-4">No projects yet</p>
            <p className="text-gray-500">Check back soon for exciting updates!</p>
          </div>
        ) : (
          projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj, index) => (
                <div
                  key={proj._id}
                  className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 transform hover:-translate-y-2 animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link to={`/projects/${proj._id}`}>
                    <div className="h-48 bg-gray-900 overflow-hidden">
                      {proj.imageUrl ? (
                        <img
                          src={proj.imageUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          No image
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {(proj.tags || []).slice(0, 4).map((tag, i) => (
                        <span
                          key={`${proj._id}-${tag}-${i}`}
                          className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition"
                        >
                          GitHub
                        </a>
                      )}
                      {proj.liveDemoUrl && (
                        <a
                          href={proj.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition"
                        >
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import { Link } from "react-router-dom";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="px-10 md:px-20 py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="text-gray-400 mt-4">Loading amazing projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      data-scroll-section
      className="px-6 md:px-20 py-20 bg-gradient-to-b from-transparent to-gray-900/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-block px-4 py-2 bg-indigo-500/20 rounded-full border border-indigo-500/30 backdrop-blur-sm mb-4">
            <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase">
              Portfolio
            </p>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Explore my recent work and side projects
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📂</div>
            <p className="text-gray-400 text-2xl mb-4">No projects yet</p>
            <p className="text-gray-500">Check back soon for exciting updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, index) => (
              <div
                key={proj._id}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 transform hover:-translate-y-2 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Clickable Project Image - Opens Detail Page */}
                <Link
                  to={`/projects/${proj._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative h-56 overflow-hidden bg-gradient-to-br from-indigo-600/20 to-purple-600/20 cursor-pointer"
                >
                  {proj.image || proj.imageUrl ?  (
                    <>
                      <img
                        src={proj.image || proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-7xl group-hover:scale-110 transition-transform duration-300">💻</span>
                    </div>
                  )}
                  
                  {/* Quick view badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-500 rounded-full text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Project
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Clickable Title */}
                  <Link
                    to={`/projects/${proj._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300 cursor-pointer hover:underline">
                      {proj. title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-400 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Tags */}
                  {proj.tags && proj.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {proj.tags. slice(0, 4).map((tag:  string, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-medium rounded-full border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                      {proj.tags.length > 4 && (
                        <span className="px-3 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full">
                          +{proj.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    {/* View Details Button */}
                    <Link
                      to={`/projects/${proj._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-center rounded-lg transition-all font-medium text-sm flex items-center justify-center gap-2 group/btn shadow-lg shadow-indigo-500/30"
                    >
                      <span>📖</span>
                      <span className="group-hover/btn:translate-x-0.5 transition-transform">View Details</span>
                    </Link>

                    {/* GitHub Link */}
                    {(proj.github || proj.githubUrl) && (
                      <a
                        href={proj. github || proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white text-center rounded-lg transition-all font-medium text-sm flex items-center justify-center gap-2 group/btn"
                        title="View on GitHub"
                      >
                        <span>💻</span>
                      </a>
                    )}

                    {/* Live Demo Link */}
                    {(proj. live || proj.liveDemoUrl) && (
                      <a
                        href={proj.live || proj.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-center rounded-lg transition-all font-medium text-sm flex items-center justify-center gap-2 group/btn shadow-lg shadow-purple-500/30"
                        title="Live Demo"
                      >
                        <span>🚀</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
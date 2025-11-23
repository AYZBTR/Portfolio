// FeaturedProjects.tsx

import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";

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

  if (loading) return <p className="text-white">Loading projects...</p>;

  return (
    // FIX: Replaced max-w-6xl mx-auto with the specific padding classes
    // from AboutSection.tsx: px-10 md:px-20
    <section className="px-10 md:px-20 py-20"> 
      <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj._id}
            className="bg-[#0E1525] p-6 rounded-xl shadow-lg border border-[#1f2937]"
          >
            <img
              src={proj.image}
              alt={proj.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <h3 className="text-xl font-semibold">{proj.title}</h3>
            <p className="text-gray-400 my-2">{proj.description}</p>

            <div className="flex gap-2 my-3 flex-wrap">
              {proj.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="bg-[#1f2937] px-3 py-1 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <a className="text-blue-400" href={proj.github} target="_blank">
                GitHub
              </a>
              <a className="text-purple-400" href={proj.live} target="_blank">
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
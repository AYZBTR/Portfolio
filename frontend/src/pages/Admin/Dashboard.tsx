import api from "../../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);

  const token = localStorage.getItem("token");

  // Fetch projects
  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const deleteProject = async (id: string) => {
    await api.delete(`/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-[#0d1117] text-white">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <Link
          to="/admin/create"
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition font-semibold"
        >
          + Add New Project
        </Link>
      </div>

      <div className="space-y-6">
        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-gray-500 transition"
          >
            <h2 className="text-2xl font-bold">{p.title}</h2>
            <p className="text-gray-400 mt-1">{p.description}</p>

            <div className="mt-4 flex gap-3">
              <Link
                to={`/admin/edit/${p._id}`}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteProject(p._id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

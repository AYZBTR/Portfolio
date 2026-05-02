import api from "../../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ADMIN_ROUTES from "../../config/adminRoutes";
import { useClerk } from "@clerk/clerk-react";

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const { signOut } = useClerk();

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
      {/* Responsive header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        {/* Right-side controls */}
        <div className="flex flex-wrap gap-3 sm:justify-end">
          <Link
            to={ADMIN_ROUTES.SETTINGS}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition font-semibold"
          >
            ⚙️ Settings
          </Link>

          <Link
            to={ADMIN_ROUTES.CREATE}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition font-semibold"
          >
            + Add New Project
          </Link>

          <button
            onClick={() => signOut({ redirectUrl: ADMIN_ROUTES.LOGIN })}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition font-semibold"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-gray-500 transition
                       h-[320px] sm:h-[220px] flex flex-col"
          >
            {/* Title preview */}
            <h2 className="text-2xl font-bold line-clamp-2">{p.title}</h2>

            {/* Description preview */}
            <p className="text-gray-400 mt-2 line-clamp-4 sm:line-clamp-3">
              {p.description}
            </p>

            {/* Actions pinned to bottom */}
            <div className="mt-auto pt-4 flex gap-3">
              <Link
                to={ADMIN_ROUTES.EDIT(p._id)}
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
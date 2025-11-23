import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetch once when id changes
  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const res = await api.get(`/projects/${id}`);
        const p = res.data;

        setTitle(p.title || "");
        setDescription(p.description || "");
        setImage(p.image || "");
        setGithub(p.github || "");
        setLive(p.live || "");
        setTags(Array.isArray(p.tags) ? p.tags.join(", ") : "");
      } catch (err) {
        console.error(err);
        setError("Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSaving(true);
    setError(null);

    try {
      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      await api.put(
        `/projects/${id}`,
        { title, description, tags: tagsArray, image, github, live },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Failed to update project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p className="text-slate-300">Loading project...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6">Edit Project</h1>

        {error && (
          <p className="mb-4 text-red-400 text-sm bg-red-900/40 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Tags{" "}
              <span className="text-xs text-slate-400">
                (comma separated: React, Node, MongoDB)
              </span>
            </label>
            <input
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Image URL</label>
            <input
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">GitHub URL</label>
            <input
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Live Demo URL</label>
            <input
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={live}
              onChange={(e) => setLive(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-2 rounded bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 font-semibold mt-2"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

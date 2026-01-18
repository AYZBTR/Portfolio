import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, updateProject } from "../../services/projectService";
import { Plus, X, Image as ImageIcon, ArrowLeft } from "lucide-react";
import ADMIN_ROUTES from "../../config/adminRoutes";

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    imageUrl: "",
    images: [""],
    githubUrl: "",
    liveDemoUrl: "",
  });

  useEffect(() => {
    const loadProject = async () => {
      if (! id) return;

      try {
        const project = await getProjectById(id);
        setFormData({
          title: project.title,
          description: project.description,
          tags: project.tags. join(", "),
          imageUrl: project.imageUrl || "",
          images: project.images && project.images.length > 0 ? project.images : [""],
          githubUrl: project. githubUrl || "",
          liveDemoUrl:  project.liveDemoUrl || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to load project:", error);
        alert("Failed to load project");
        navigate(ADMIN_ROUTES. BASE);
      }
    };

    loadProject();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index: number, value:  string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index:  number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ... formData, images: newImages. length > 0 ? newImages :  [""] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (! id) return;

    setSaving(true);

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const validImages = formData.images.filter(img => img.trim() !== "");

      const projectData = {
        title:  formData.title,
        description: formData.description,
        tags: tagsArray,
        imageUrl: formData.imageUrl,
        images: validImages,
        githubUrl: formData.githubUrl,
        liveDemoUrl: formData.liveDemoUrl,
      };

      await updateProject(id, projectData);
      alert("✅ Project updated successfully!");
      navigate(ADMIN_ROUTES. BASE);
    } catch (error) {
      console.error("Error updating project:", error);
      alert("❌ Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading project...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin")}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-8">Edit Project</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus: border-indigo-500 transition-colors resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Tags <span className="text-gray-500 text-sm">(comma separated)</span>
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Main Image */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Main Image URL <span className="text-gray-500 text-sm">(Featured/Thumbnail)</span>
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Additional Images */}
            <div className="border border-indigo-500/30 rounded-xl p-6 bg-indigo-500/5">
              <div className="flex items-center justify-between mb-4">
                <label className="text-gray-300 font-medium flex items-center gap-2">
                  <ImageIcon size={20} className="text-indigo-400" />
                  Additional Images <span className="text-gray-500 text-sm">(Gallery)</span>
                </label>
                <button
                  type="button"
                  onClick={addImageField}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Plus size={16} />
                  Add Image
                </button>
              </div>

              <div className="space-y-3">
                {formData.images.map((img, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={img}
                      onChange={(e) => handleImageChange(index, e. target.value)}
                      className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder={`Image ${index + 1} URL`}
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">GitHub URL</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Live Demo URL */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">Live Demo URL</label>
              <input
                type="url"
                name="liveDemoUrl"
                value={formData.liveDemoUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus: outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 rounded-xl font-bold text-white shadow-xl shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
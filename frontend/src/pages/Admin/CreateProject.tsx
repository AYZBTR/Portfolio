import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../services/projectService";
import { Plus, X, Image as ImageIcon } from "lucide-react";
import ADMIN_ROUTES from "../../config/adminRoutes";

export default function CreateProject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    imageUrl: "",
    images: [""],  // NEW: Array of image URLs
    githubUrl: "",
    liveDemoUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // NEW: Handle additional image URL changes
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  // NEW: Add image URL field
  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  // NEW: Remove image URL field
  const removeImageField = (index: number) => {
    const newImages = formData. images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      // Filter out empty image URLs
      const validImages = formData.images.filter(img => img. trim() !== "");

      const projectData = {
        title: formData.title,
        description: formData.description,
        tags: tagsArray,
        imageUrl: formData.imageUrl,
        images: validImages,  // NEW: Send images array
        githubUrl: formData.githubUrl,
        liveDemoUrl: formData. liveDemoUrl,
      };

      await createProject(projectData);
      alert("✅ Project created successfully!");
      navigate(ADMIN_ROUTES.BASE);
    } catch (error) {
      console.error("Error creating project:", error);
      alert("❌ Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-8">Add New Project</h1>

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
                placeholder="My Awesome Project"
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
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                placeholder="Describe your project in detail..."
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Tags <span className="text-gray-500 text-sm">(comma separated:  React, Node, MongoDB)</span>
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="React, TypeScript, Tailwind CSS"
              />
            </div>

            {/* Main Image URL */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Main Image URL <span className="text-gray-500 text-sm">(Featured/Thumbnail)</span>
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData. imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus: border-indigo-500 transition-colors"
                placeholder="https://i.imgur.com/example.png"
              />
            </div>

            {/* Additional Images - NEW SECTION */}
            <div className="border border-indigo-500/30 rounded-xl p-6 bg-indigo-500/5">
              <div className="flex items-center justify-between mb-4">
                <label className="text-gray-300 font-medium flex items-center gap-2">
                  <ImageIcon size={20} className="text-indigo-400" />
                  Additional Images <span className="text-gray-500 text-sm">(Gallery/Carousel)</span>
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
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus: outline-none focus:border-indigo-500 transition-colors"
                      placeholder={`Image ${index + 1} URL - https://i.imgur.com/example.png`}
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 transition-colors"
                        title="Remove image"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-gray-500 text-sm mt-3">
                💡 Tip: Upload images to <a href="https://imgur.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Imgur</a> and paste the direct image URLs here
              </p>
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">GitHub URL</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus: border-indigo-500 transition-colors"
                placeholder="https://github.com/username/repo"
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
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="https://myproject.vercel.app"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 rounded-xl font-bold text-white shadow-xl shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 disabled: scale-100 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Project..." : "Create Project"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
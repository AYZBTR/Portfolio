import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById } from "../services/projectService";
import type { Project } from "../services/projectService";
import { ArrowLeft, Github, ExternalLink, Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadProject = async () => {
      if (!id) {
        setError("No project ID provided");
        setLoading(false);
        return;
      }

      try {
        const data = await getProjectById(id);
        setProject(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load project:", err);
        setError("Failed to load project");
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  // Get all images (main + additional)
  const getAllImages = () => {
    if (!project) return [];
    const images = [];
    if (project.imageUrl) images.push(project.imageUrl);
    if (project.images && project.images.length > 0) {
      images.push(...project.images);
    }
    return images;
  };

  const allImages = getAllImages();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-xl">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">😞</div>
          <p className="text-red-400 text-2xl mb-6">{error || "Project not found"}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-bold text-white shadow-xl shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Beautiful Back Button */}
        <div className="mb-8 animate-fadeIn">
          <button
            onClick={() => navigate("/")}
            className="group inline-flex items-center gap-3 px-6 py-3 bg-gray-800/50 hover:bg-gray-800 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-indigo-500/50 text-gray-300 hover:text-white transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-x-1"
          >
            <ArrowLeft 
              size={20} 
              className="group-hover:-translate-x-1 transition-transform duration-300" 
            />
            <span className="font-semibold">Back to Portfolio</span>
          </button>
        </div>

        {/* Project Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 shadow-2xl animate-fadeIn delay-100">
          
          {/* IMAGE CAROUSEL/GALLERY - NEW */}
          {allImages.length > 0 && (
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-br from-indigo-600/20 to-purple-600/20 group">
              {/* Current Image */}
              <img
                src={allImages[currentImageIndex]}
                alt={`${project. title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

              {/* Navigation Arrows (only if multiple images) */}
              {allImages. length > 1 && (
                <>
                  {/* Previous Button */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900/80 hover:bg-gray-800 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-gray-700 hover: border-indigo-500 transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900/80 hover:bg-gray-800 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-gray-700 hover:border-indigo-500 transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-900/80 backdrop-blur-sm rounded-full border border-gray-700 text-white text-sm font-medium">
                    {currentImageIndex + 1} / {allImages.length}
                  </div>

                  {/* Thumbnail Dots */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {allImages. map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? "bg-indigo-500 w-8"
                            : "bg-gray-500 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Image Label */}
              <div className="absolute top-4 left-4 px-4 py-2 bg-indigo-500/20 backdrop-blur-sm rounded-lg border border-indigo-500/30">
                <p className="text-indigo-300 text-sm font-medium">
                  {currentImageIndex === 0 ? "Featured Image" : `Screenshot ${currentImageIndex + 1}`}
                </p>
              </div>
            </div>
          )}

          {/* Project Content */}
          <div className="p-8 md:p-12">
            {/* Title with Gradient */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {project.title}
              </span>
            </h1>

            {/* Tags Section */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tags. map((tag, index) => (
                  <span
                    key={index}
                    className="group px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-sm rounded-full text-indigo-300 text-sm font-medium flex items-center gap-2 hover:bg-indigo-500/30 hover:border-indigo-500/50 transition-all duration-300 cursor-default"
                  >
                    <Tag size={14} className="group-hover:rotate-12 transition-transform" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description Section */}
            <div className="mb-8">
              <div className="inline-block px-4 py-2 bg-indigo-500/20 rounded-full border border-indigo-500/30 backdrop-blur-sm mb-4">
                <h2 className="text-indigo-400 text-sm font-medium tracking-widest uppercase">
                  About This Project
                </h2>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Metadata */}
            {project.createdAt && (
              <div className="flex items-center gap-3 text-gray-400 mb-8 px-4 py-3 bg-gray-900/30 rounded-lg border border-gray-700/50 w-fit">
                <Calendar size={18} className="text-indigo-400" />
                <span className="font-medium">
                  Created: {new Date(project.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 bg-gray-700/50 hover:bg-gray-700 backdrop-blur-sm rounded-xl font-bold text-white flex items-center gap-3 transition-all duration-300 transform hover:scale-105 border border-gray-600 hover: border-gray-500 shadow-lg hover:shadow-gray-500/20"
                >
                  <Github size={22} className="group-hover:rotate-12 transition-transform" />
                  <span>View on GitHub</span>
                  <ExternalLink size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              )}

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-bold text-white flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-indigo-500/50 hover:shadow-indigo-500/70"
                >
                  <span className="text-xl">🚀</span>
                  <span>Live Demo</span>
                  <ExternalLink size={18} className="opacity-75 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery (if multiple images) - NEW */}
          {allImages.length > 1 && (
            <div className="px-8 pb-8 md:px-12 md:pb-12">
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-gray-300 font-semibold mb-4 flex items-center gap-2">
                  <Tag size={18} className="text-indigo-400" />
                  All Screenshots ({allImages.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                        index === currentImageIndex
                          ?  "border-indigo-500 shadow-lg shadow-indigo-500/50"
                          : "border-gray-700 hover:border-indigo-500/50"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-indigo-500/20 flex items-center justify-center">
                          <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Back Button at Bottom */}
        <div className="mt-12 text-center animate-fadeIn delay-200">
          <button
            onClick={() => navigate("/")}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 backdrop-blur-sm rounded-xl border border-gray-600 hover: border-indigo-500/50 text-gray-300 hover:text-white transition-all duration-300 shadow-xl hover:shadow-indigo-500/20 transform hover:scale-105"
          >
            <ArrowLeft 
              size={20} 
              className="group-hover:-translate-x-1 transition-transform duration-300" 
            />
            <span className="font-bold">Explore More Projects</span>
          </button>
        </div>
      </div>
    </div>
  );
}
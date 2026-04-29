import api from "./api";

export interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  images?: string[];
  githubUrl: string;
  liveDemoUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * ✅ FALLBACK PROJECTS (shown if API is down/sleeping/empty)
 * Replace/add your real projects here for best recruiter impact.
 */
const FALLBACK_PROJECTS: Project[] = [
  {
    _id: "fallback-portfolio",
    title: "Full‑Stack Portfolio + Admin CMS Dashboard",
    description:
      "Production-style portfolio with admin panel to manage projects and site settings. Protected routes, Clerk/JWT auth flow, and Cloudinary image uploads.",
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "Cloudinary"],
    imageUrl: "", // optional: add a hosted image URL
    images: [],
    githubUrl: "https://github.com/AYZBTR/Portfolio",
    liveDemoUrl: "", // optional: add your deployed URL
  },
];

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await api.get<Project[]>("/projects");
    const data = res.data ?? [];

    // If server returns empty, still show fallback so UI isn't blank
    return data.length > 0 ? data : FALLBACK_PROJECTS;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return FALLBACK_PROJECTS;
  }
}

export async function getProjectById(id: string): Promise<Project> {
  try {
    console.log("🔍 Fetching project with ID:", id);
    const res = await api.get<Project>(`/projects/${id}`);
    console.log("✅ Project fetched:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching project by ID:", error);
    throw error;
  }
}

export async function createProject(
  data: Partial<Project>,
  token?: string
): Promise<Project> {
  try {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : undefined;

    const res = await api.post<Project>("/projects", data, config);
    console.log("✅ Project created:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error creating project:", error);
    throw error;
  }
}

export async function updateProject(
  id: string,
  data: Partial<Project>,
  token?: string
): Promise<Project> {
  try {
    console.log("📝 Updating project:", id, data);

    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : undefined;

    const res = await api.put<Project>(`/projects/${id}`, data, config);
    console.log("✅ Project updated:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error updating project:", error);
    throw error;
  }
}

export async function deleteProject(id: string, token?: string): Promise<void> {
  try {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : undefined;

    await api.delete(`/projects/${id}`, config);
    console.log("✅ Project deleted:", id);
  } catch (error) {
    console.error("❌ Error deleting project:", error);
    throw error;
  }
}

export default {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
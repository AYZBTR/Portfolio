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

const FALLBACK_PROJECTS: Project[] = [
  {
    _id: "fallback-portfolio",
    title: "Full‑Stack Portfolio + Admin CMS Dashboard",
    description:
      "Portfolio with admin CMS to manage projects and site settings. Includes Cloudinary uploads and protected admin routes.",
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "Cloudinary"],
    imageUrl: "",
    images: [],
    githubUrl: "https://github.com/AYZBTR/Portfolio",
    liveDemoUrl: "",
  },
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProjects(): Promise<Project[]> {
  try {
    // ✅ Race the API call vs a short timeout.
    // If API is slow (Render cold start), we show fallback immediately.
    const apiPromise = api.get<Project[]>("/projects").then((r) => r.data ?? []);
    const timeoutPromise = delay(2500).then(() => "timeout" as const);

    const result = await Promise.race([apiPromise, timeoutPromise]);

    if (result === "timeout") {
      console.warn("Projects API slow; showing fallback projects.");
      return FALLBACK_PROJECTS;
    }

    return result.length > 0 ? result : FALLBACK_PROJECTS;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return FALLBACK_PROJECTS;
  }
}

export async function getProjectById(id: string): Promise<Project> {
  const res = await api.get<Project>(`/projects/${id}`);
  return res.data;
}

export async function createProject(
  data: Partial<Project>,
  token?: string
): Promise<Project> {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
  const res = await api.post<Project>("/projects", data, config);
  return res.data;
}

export async function updateProject(
  id: string,
  data: Partial<Project>,
  token?: string
): Promise<Project> {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
  const res = await api.put<Project>(`/projects/${id}`, data, config);
  return res.data;
}

export async function deleteProject(id: string, token?: string): Promise<void> {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
  await api.delete(`/projects/${id}`, config);
}

export default {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
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
  createdAt?:  string;
  updatedAt?: string;
}

/**
 * Fetch all projects
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const res = await api.get<Project[]>("/projects");
    return res.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

/**
 * Fetch single project by ID
 */
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

/**
 * Create a new project
 * Pass token if the route is protected (recommended)
 */
export async function createProject(
  data: Partial<Project>,
  token?: string
): Promise<Project> {
  try {
    const config = token
      ? { headers:  { Authorization: `Bearer ${token}` } }
      : undefined;

    const res = await api. post<Project>("/projects", data, config);
    console.log("✅ Project created:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error creating project:", error);
    throw error;
  }
}

/**
 * Update an existing project
 * Pass token if the route is protected (recommended)
 */
export async function updateProject(
  id: string,
  data: Partial<Project>,
  token?: string
): Promise<Project> {
  try {
    console.log("📝 Updating project:", id, data);
    
    const config = token
      ?  { headers: { Authorization: `Bearer ${token}` } }
      : undefined;

    const res = await api.put<Project>(`/projects/${id}`, data, config);
    console.log("✅ Project updated:", res. data);
    return res.data;
  } catch (error) {
    console.error("❌ Error updating project:", error);
    throw error;
  }
}

/**
 * Delete a project
 * Pass token if the route is protected (recommended)
 */
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
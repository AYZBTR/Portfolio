import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 60000, // 60 second timeout for Render cold starts
});

// Helper: decide if request needs auth header
function shouldAttachAuth(config: any) {
  const method = (config.method || "get").toLowerCase();
  const url = (config.url || "").toString();

  // Always attach token for mutations (admin actions)
  if (["post", "put", "patch", "delete"].includes(method)) return true;

  // Attach for specific GET endpoints that are protected (if you add any later)
  // Example: /admin/*, /me, etc.
  if (method === "get" && url.startsWith("/admin")) return true;

  // Public GETs like /settings and /projects should not wait for Clerk
  return false;
}

// Intercept requests to add Clerk session token (only when needed)
api.interceptors.request.use(async (config) => {
  try {
    if (!shouldAttachAuth(config)) return config;

    const token = await (window as any).Clerk?.session?.getToken();

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Added Clerk token to request");
    } else {
      console.warn("⚠️ No Clerk token found");
    }
  } catch (error) {
    console.error("Error getting Clerk token:", error);
  }

  return config;
});

// Intercept responses to handle errors gracefully
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout - server might be spinning up");
    }

    // Log the error but don't break the app
    console.error("API Error:", error.message);

    return Promise.reject(error);
  }
);

export default api;
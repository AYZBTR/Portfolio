import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Intercept requests to add Clerk session token
api. interceptors.request.use(async (config) => {
  try {
    // Get Clerk session token
    const token = await window.Clerk?.session?.getToken();
    
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

export default api;
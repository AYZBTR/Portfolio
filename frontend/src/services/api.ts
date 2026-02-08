import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 60000, // 60 second timeout for Render cold starts
});

// Intercept requests to add Clerk session token
api.interceptors.request.use(async (config) => {
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

// Intercept responses to handle errors gracefully
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error("Request timeout - server might be spinning up");
    }
    
    // Log the error but don't break the app
    console.error("API Error:", error.message);
    
    return Promise.reject(error);
  }
);

export default api;
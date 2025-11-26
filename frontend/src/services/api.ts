import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // ensure headers object exists (avoids TS errors)
    config.headers = config.headers || {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - axios headers typing can be narrow in some setups
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

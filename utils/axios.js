import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    console.log("hello interceptors");
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh", {}, { withCredentials: true });
        return api(originalRequest);
      } catch (refreshErr) {
        if (typeof window !== "undefined") window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;

import axios from "axios";
import { generateAlert } from "../utils/alertService";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* Request interceptor */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* Response interceptor */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {  
    if (error.response?.status === 401) {
      generateAlert("Session expired. Please log in again.", "warning");
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

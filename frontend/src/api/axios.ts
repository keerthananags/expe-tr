import axios from "axios";
import logger from "../utils/logger";

const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  
  logger.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
    method: config.method,
    url: config.url,
    headers: config.headers
  });
  
  return config;
});

api.interceptors.response.use(
  (res) => {
    logger.info(`API Response: ${res.config.method?.toUpperCase()} ${res.config.url} - ${res.status}`, {
      method: res.config.method,
      url: res.config.url,
      status: res.status,
      data: res.data
    });
    return res;
  },
  (err) => {
    logger.error(`API Error: ${err.config?.method?.toUpperCase()} ${err.config?.url} - ${err.response?.status}`, {
      method: err.config?.method,
      url: err.config?.url,
      status: err.response?.status,
      message: err.response?.data?.message || err.message,
      data: err.response?.data
    });
    
    if (err.response?.status === 401) {
      logger.warn("Unauthorized access - redirecting to login");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
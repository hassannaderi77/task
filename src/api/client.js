import axios from "axios";
import { getApiErrorMessage } from "./errorHandler";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 300000,
  withCredentials: false,
});

apiClient.interceptors.request.use(
  (config) => {
    

    // فقط برای درخواست‌های معمولی JSON
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    console.error("API Error:", {
      status,
      message: getApiErrorMessage(error),
    });

    return Promise.reject(error);
  }
);

export default apiClient;
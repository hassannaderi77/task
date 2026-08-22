import axios from "axios";

const avalaiClient = axios.create({
  baseURL: import.meta.env.VITE_AVALAI_API_URL,
  timeout: 120000,
});

avalaiClient.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_AVALAI_API_KEY;

  config.headers.Authorization = `Bearer ${apiKey}`;

  return config;
});

export default avalaiClient;
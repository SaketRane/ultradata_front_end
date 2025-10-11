import axios from 'axios';

export const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://194.163.164.118:8094/api';

export const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  (config) => {
    // if (!token) return config;
    // if (config?.headers) {
    //   config.headers = { Authorization: `Bearer ${token}` };
    // }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

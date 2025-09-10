import axios from 'axios';

export const baseURLApi = import.meta.env.VITE_API_URL || null;

export const api = axios.create({
  baseURL: baseURLApi,
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

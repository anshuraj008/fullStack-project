import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/';

const api = axios.create({ baseURL });

// Attach token on each request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

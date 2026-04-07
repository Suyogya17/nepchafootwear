// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
// Automatically attach admin token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Products ──────────────────────────────────────────
export const productService = {
  getAll: () =>
    api.get('/products').then((r) => r.data),

  getOne: (id: string) =>
    api.get(`/products/${id}`).then((r) => r.data),

  create: (data: object) =>
    api.post('/products/admin', data).then((r) => r.data),

  update: (id: string, data: object) =>
    api.put(`/products/admin/${id}`, data).then((r) => r.data),

  delete: (id: string) =>
    api.delete(`/products/admin/${id}`).then((r) => r.data),
};

// ── Image upload ──────────────────────────────────────
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await api.post('/upload', formData);
  return res.data.url; // returns "/uploads/filename.jpg"
};

// ── Auth ──────────────────────────────────────────────
export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }).then((r) => r.data),

  logout: () => localStorage.removeItem('token'),

  isLoggedIn: () => !!localStorage.getItem('token'),
};

export default api;
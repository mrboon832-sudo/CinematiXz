import axios from 'axios';
import { auth } from './firebaseConfig';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access - please login');
    }
    return Promise.reject(error);
  }
);

// Review API calls
export const reviewApi = {
  getAll: () => api.get('/reviews'),
  getById: (id) => api.get(`/reviews/${id}`),
  getByMovie: (movieId) => api.get(`/reviews/movie/${movieId}`),
  getByUser: (userId) => api.get(`/reviews/user/${userId}`),
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
};

// User API calls
export const userApi = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getById: (id) => api.get(`/users/${id}`),
};

// Movie API calls
export const movieApi = {
  getPopular: (page = 1) => api.get(`/movies/popular?page=${page}`),
  getTrending: () => api.get('/movies/trending'),
  search: (query, page = 1) => api.get(`/movies/search?query=${query}&page=${page}`),
  getDetails: (id) => api.get(`/movies/${id}`),
};

export default api;

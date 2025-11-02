const axios = require('axios');
const config = require('../config/config');

// Create axios instance for TMDB API
const tmdbApi = axios.create({
  baseURL: config.tmdb.baseUrl || 'https://api.themoviedb.org/3',
  params: {
    api_key: config.tmdb.apiKey,
  },
  timeout: 10000,
});

// Add request interceptor
tmdbApi.interceptors.request.use(
  (config) => {
    console.log(`[TMDB API] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('[TMDB API Error]', error.response.status);
    }
    return Promise.reject(error);
  }
);

class TMDBService {
  async getPopularMovies(page = 1) {
    try {
      const response = await tmdbApi.get('/movie/popular', { params: { page } });
      return this.formatMovieList(response.data.results);
    } catch (error) {
      throw new Error('Failed to fetch popular movies');
    }
  }

  async searchMovies(query, page = 1) {
    try {
      if (!query || query.trim().length === 0) {
        throw new Error('Search query is required');
      }
      const response = await tmdbApi.get('/search/movie', {
        params: { query: query.trim(), page, include_adult: false },
      });
      return this.formatMovieList(response.data.results);
    } catch (error) {
      throw new Error('Failed to search movies');
    }
  }

  async getMovieDetails(movieId) {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}`);
      return this.formatMovieDetails(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Movie not found');
      }
      throw new Error('Failed to fetch movie details');
    }
  }

  async getTrendingMovies(timeWindow = 'week') {
    try {
      const response = await tmdbApi.get(`/trending/movie/${timeWindow}`);
      return this.formatMovieList(response.data.results);
    } catch (error) {
      throw new Error('Failed to fetch trending movies');
    }
  }

  formatMovieList(movies) {
    if (!Array.isArray(movies)) return [];
    return movies.map(movie => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      backdropPath: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
        : null,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      voteCount: movie.vote_count,
    }));
  }

  formatMovieDetails(movie) {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      backdropPath: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
        : null,
      releaseDate: movie.release_date,
      runtime: movie.runtime,
      genres: movie.genres?.map(g => g.name) || [],
      rating: movie.vote_average,
      voteCount: movie.vote_count,
      tagline: movie.tagline,
      status: movie.status,
    };
  }

  async testConnection() {
    try {
      await tmdbApi.get('/configuration');
      console.log('✅ TMDB API connection successful');
      return true;
    } catch (error) {
      console.error('❌ TMDB API connection failed:', error.message);
      return false;
    }
  }
}

module.exports = new TMDBService();
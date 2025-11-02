const axios = require('axios');
const config = require('../config/config');

const tmdbApi = axios.create({
  baseURL: config.tmdb.baseUrl,
  params: {
    api_key: config.tmdb.apiKey,
  },
});

class ExternalApiService {
  // Get popular movies
  async getPopularMovies(page = 1) {
    try {
      const response = await tmdbApi.get('/movie/popular', {
        params: { page },
      });
      return this.formatMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw new Error('Failed to fetch popular movies');
    }
  }

  // Search movies
  async searchMovies(query, page = 1) {
    try {
      const response = await tmdbApi.get('/search/movie', {
        params: { query, page },
      });
      return this.formatMovies(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      throw new Error('Failed to search movies');
    }
  }

  // Get movie details
  async getMovieDetails(movieId) {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}`);
      return this.formatMovieDetails(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw new Error('Failed to fetch movie details');
    }
  }

  // Get trending movies
  async getTrendingMovies() {
    try {
      const response = await tmdbApi.get('/trending/movie/week');
      return this.formatMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw new Error('Failed to fetch trending movies');
    }
  }

  // Format movie list
  formatMovies(movies) {
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

  // Format detailed movie info
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
}

module.exports = new ExternalApiService();
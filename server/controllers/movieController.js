const tmdbService = require('../services/tmdbService');
const { AppError } = require('../middleware/errorHandler');

exports.getPopularMovies = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const movies = await tmdbService.getPopularMovies(page);
    res.json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

exports.searchMovies = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      throw new AppError('Search query is required', 400);
    }
    const page = parseInt(req.query.page) || 1;
    const movies = await tmdbService.searchMovies(query, page);
    res.json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMovieDetails = async (req, res, next) => {
  try {
    const movie = await tmdbService.getMovieDetails(req.params.id);
    res.json({
      success: true,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTrendingMovies = async (req, res, next) => {
  try {
    const movies = await tmdbService.getTrendingMovies();
    res.json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};
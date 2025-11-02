import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import MovieCard from '../components/movies/MovieCard';
import MovieSearch from '../components/movies/MovieSearch';
import Spinner from '../components/common/Spinner';
import { movieApi } from '../services/api';
import { getErrorMessage } from '../utils/helpers';
import './HomePage.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      setError('');
      setSearchMode(false);
      const response = await movieApi.getPopular();
      setMovies(response.data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError('');
      setSearchMode(true);
      const response = await movieApi.search(query);
      setMovies(response.data.data);
      
      if (response.data.data.length === 0) {
        setError('No movies found. Try a different search term.');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="home-page">
      <div className="hero-section text-center py-5">
        <h1 className="display-4">🎬 Discover Movies</h1>
        <p className="lead">Search, review, and share your favorite films</p>
      </div>

      <MovieSearch onSearch={handleSearch} />

      {searchMode && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Search Results</h3>
          <button className="btn btn-outline-primary" onClick={loadPopularMovies}>
            Back to Popular Movies
          </button>
        </div>
      )}

      {!searchMode && <h3 className="mb-4">Popular Movies</h3>}

      {error && (
        <Alert variant="warning" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Spinner message="Loading movies..." />
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      )}

      {!loading && movies.length === 0 && !error && (
        <div className="text-center py-5">
          <h4 className="text-muted">No movies to display</h4>
        </div>
      )}
    </Container>
  );
};

export default HomePage;
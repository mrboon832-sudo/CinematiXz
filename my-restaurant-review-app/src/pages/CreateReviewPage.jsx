import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import ReviewForm from '../components/reviews/ReviewForm';
import MovieSearch from '../components/movies/MovieSearch';
import MovieCard from '../components/movies/MovieCard';
import Spinner from '../components/common/Spinner';
import { reviewApi, movieApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/helpers';
import './CreateReviewPage.css';

const CreateReviewPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedMovie, setSelectedMovie] = useState(location.state?.movie || null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    }
  }, [currentUser, navigate]);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError('');
      const response = await movieApi.search(query);
      setSearchResults(response.data.data);
      
      if (response.data.data.length === 0) {
        setError('No movies found. Try a different search term.');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setSearchResults([]);
  };

  const handleSubmitReview = async (formData) => {
    try {
      setError('');
      setLoading(true);
      await reviewApi.create(formData);
      setSuccess('Review submitted successfully!');
      
      setTimeout(() => {
        navigate('/my-reviews');
      }, 1500);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading && !searchResults.length) {
    return <Spinner message="Processing..." />;
  }

  return (
    <Container className="create-review-page">
      <h2 className="mb-4">Write a Review</h2>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success">{success}</Alert>
      )}

      {!selectedMovie ? (
        <div>
          <p className="text-muted mb-4">Search for a movie to review</p>
          <MovieSearch onSearch={handleSearch} />
          
          {loading && <Spinner message="Searching..." />}
          
          {searchResults.length > 0 && (
            <div className="search-results">
              <h4 className="mb-3">Select a Movie</h4>
              <div className="row">
                {searchResults.map((movie) => (
                  <div 
                    key={movie.id} 
                    className="col-md-3 mb-3"
                    onClick={() => handleMovieSelect(movie)}
                    style={{ cursor: 'pointer' }}
                  >
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <button 
            className="btn btn-outline-secondary mb-3"
            onClick={() => setSelectedMovie(null)}
          >
            ← Choose Different Movie
          </button>
          
          <ReviewForm
            movieData={selectedMovie}
            onSubmit={handleSubmitReview}
            onCancel={handleCancel}
          />
        </div>
      )}
    </Container>
  );
};

export default CreateReviewPage;

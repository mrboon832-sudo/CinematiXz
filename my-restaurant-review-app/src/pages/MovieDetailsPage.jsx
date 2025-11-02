import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';
import MovieDetail from '../components/movies/MovieDetail';
import ReviewList from '../components/reviews/ReviewList';
import Spinner from '../components/common/Spinner';
import { movieApi, reviewApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage, calculateAverageRating } from '../utils/helpers';
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMovieData();
  }, [id]);

  const loadMovieData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load movie details and reviews in parallel
      const [movieRes, reviewsRes] = await Promise.all([
        movieApi.getDetails(id),
        reviewApi.getByMovie(id),
      ]);
      
      setMovie(movieRes.data.data);
      setReviews(reviewsRes.data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleWriteReview = () => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    navigate('/create-review', { state: { movie } });
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewApi.delete(reviewId);
        setReviews(reviews.filter(r => r.id !== reviewId));
      } catch (err) {
        alert(getErrorMessage(err));
      }
    }
  };

  if (loading) {
    return <Spinner message="Loading movie details..." />;
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </Container>
    );
  }

  const averageRating = calculateAverageRating(reviews);

  return (
    <Container className="movie-details-page">
      <Button 
        variant="outline-secondary" 
        className="mb-3"
        onClick={() => navigate('/')}
      >
        ← Back to Movies
      </Button>

      {movie && <MovieDetail movie={movie} />}

      <div className="reviews-section mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3>User Reviews</h3>
            {reviews.length > 0 && (
              <p className="text-muted mb-0">
                Average Rating: ⭐ {averageRating} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
              </p>
            )}
          </div>
          <Button variant="primary" onClick={handleWriteReview}>
            ✍️ Write a Review
          </Button>
        </div>

        <ReviewList 
          reviews={reviews} 
          onDelete={handleDeleteReview}
          showMovieInfo={false}
        />
      </div>
    </Container>
  );
};

export default MovieDetailsPage;


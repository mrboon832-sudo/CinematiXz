import { useState, useEffect } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReviewList from '../components/reviews/ReviewList';
import Spinner from '../components/common/Spinner';
import { reviewApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/helpers';
import './MyReviewsPage.css';

const MyReviewsPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await reviewApi.getByUser(currentUser.uid);
        setReviews(response.data.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    if (!currentUser) {
      navigate('/auth');
      return;
    }
    
    loadReviews();
  }, [currentUser, navigate]); // Now all dependencies are properly declared

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
    return <Spinner message="Loading your reviews..." />;
  }

  return (
    <Container className="my-reviews-page">
      <div className="page-header">
        <h2>My Reviews</h2>
        <Button variant="primary" onClick={() => navigate('/create-review')}>
          ✍️ Write New Review
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <ReviewList reviews={reviews} onDelete={handleDeleteReview} />
    </Container>
  );
};

export default MyReviewsPage;
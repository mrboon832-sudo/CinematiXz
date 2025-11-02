import { Card, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RatingStars from './RatingStars';
import { formatDate } from '../../utils/helpers';
import './ReviewCard.css';

const ReviewCard = ({ review, onDelete, showMovieInfo = true }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const isOwner = currentUser?.uid === review.userId;

  const handleEdit = () => {
    navigate(`/edit-review/${review.id}`, { state: { review } });
  };

  const handleMovieClick = () => {
    if (review.movieId) {
      navigate(`/movie/${review.movieId}`);
    }
  };

  return (
    <Card className="review-card mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <Card.Title>{review.title}</Card.Title>
            {showMovieInfo && (
              <Card.Subtitle 
                className="mb-2 text-muted movie-title-link" 
                onClick={handleMovieClick}
                style={{ cursor: 'pointer' }}
              >
                🎬 {review.movieTitle}
              </Card.Subtitle>
            )}
          </div>
          <RatingStars rating={review.rating} readOnly />
        </div>

        <Card.Text>{review.comment}</Card.Text>

        <div className="review-meta">
          <small className="text-muted">
            By {review.userName} • {formatDate(review.createdAt)}
          </small>
        </div>

        {isOwner && (
          <div className="mt-3">
            <Button variant="primary" size="sm" className="me-2" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={() => onDelete(review.id)}>
              Delete
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;

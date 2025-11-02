import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import RatingStars from './RatingStars';
import './ReviewForm.css';

const ReviewForm = ({ 
  initialData = {}, 
  movieData = null, 
  onSubmit, 
  onCancel,
  isEditing = false 
}) => {
  const [formData, setFormData] = useState({
    movieId: initialData.movieId || movieData?.id || '',
    movieTitle: initialData.movieTitle || movieData?.title || '',
    moviePoster: initialData.moviePoster || movieData?.posterPath || '',
    rating: initialData.rating || 0,
    title: initialData.title || '',
    comment: initialData.comment || '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (movieData) {
      setFormData(prev => ({
        ...prev,
        movieId: movieData.id,
        movieTitle: movieData.title,
        moviePoster: movieData.posterPath,
      }));
    }
  }, [movieData]);

  const validate = () => {
    const newErrors = {};

    if (!formData.rating || formData.rating < 1) {
      newErrors.rating = 'Please select a rating';
    }
    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    if (!formData.comment || formData.comment.trim().length < 10) {
      newErrors.comment = 'Comment must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  return (
    <Card className="review-form">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {movieData && (
            <div className="movie-info mb-4">
              <h5>🎬 {movieData.title}</h5>
              {movieData.posterPath && (
                <img 
                  src={movieData.posterPath} 
                  alt={movieData.title}
                  className="movie-poster-small"
                />
              )}
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Rating *</Form.Label>
            <div>
              <RatingStars 
                rating={formData.rating} 
                onRatingChange={handleRatingChange}
              />
            </div>
            {errors.rating && (
              <Form.Text className="text-danger">{errors.rating}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Review Title *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Absolute Masterpiece!"
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Your Review *</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Share your thoughts about this movie..."
              isInvalid={!!errors.comment}
            />
            <Form.Control.Feedback type="invalid">
              {errors.comment}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              {formData.comment.length} / 1000 characters
            </Form.Text>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              {isEditing ? 'Update Review' : 'Submit Review'}
            </Button>
            {onCancel && (
              <Button variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ReviewForm;


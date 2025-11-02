import React from 'react';
import './RatingStars.css';

const RatingStars = ({ rating, onRatingChange, readOnly = false }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="rating-stars">
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''} ${!readOnly ? 'clickable' : ''}`}
          onClick={() => !readOnly && onRatingChange && onRatingChange(star)}
        >
          ⭐
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
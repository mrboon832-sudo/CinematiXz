import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReviewCard from './ReviewCard';

const ReviewList = ({ reviews, onDelete, showMovieInfo = true }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-5">
        <h4 className="text-muted">No reviews yet</h4>
        <p>Be the first to write a review!</p>
      </div>
    );
  }

  return (
    <Row>
      <Col>
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onDelete={onDelete}
            showMovieInfo={showMovieInfo}
          />
        ))}
      </Col>
    </Row>
  );
};

export default ReviewList;

import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import './MovieDetail.css';

const MovieDetail = ({ movie }) => {
  return (
    <div className="movie-detail">
      <Row>
        <Col md={4}>
          {movie.posterPath ? (
            <img
              src={movie.posterPath}
              alt={movie.title}
              className="movie-detail-poster"
            />
          ) : (
            <div className="no-poster-large">
              <span>🎬</span>
              <p>No Image Available</p>
            </div>
          )}
        </Col>
        <Col md={8}>
          <h1>{movie.title}</h1>
          
          {movie.tagline && (
            <p className="tagline">"{movie.tagline}"</p>
          )}

          <div className="movie-meta mb-3">
            <span className="rating-large">
              ⭐ {movie.rating?.toFixed(1) || 'N/A'} / 10
            </span>
            {movie.releaseDate && (
              <span className="ms-3">
                📅 {new Date(movie.releaseDate).getFullYear()}
              </span>
            )}
            {movie.runtime && (
              <span className="ms-3">
                ⏱️ {movie.runtime} min
              </span>
            )}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-3">
              {movie.genres.map((genre, index) => (
                <Badge key={index} bg="primary" className="me-2">
                  {genre}
                </Badge>
              ))}
            </div>
          )}

          <h5>Overview</h5>
          <p className="overview">{movie.overview || 'No overview available.'}</p>

          {movie.status && (
            <p className="text-muted">
              <strong>Status:</strong> {movie.status}
            </p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MovieDetail;

import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card className="movie-card h-100" onClick={handleClick}>
      <div className="movie-poster-container">
        {movie.posterPath ? (
          <Card.Img 
            variant="top" 
            src={movie.posterPath} 
            alt={movie.title}
            className="movie-poster"
          />
        ) : (
          <div className="no-poster">
            <span>🎬</span>
            <p>No Image</p>
          </div>
        )}
        <div className="movie-rating-badge">
          ⭐ {movie.rating?.toFixed(1) || 'N/A'}
        </div>
      </div>
      <Card.Body>
        <Card.Title className="movie-title">{movie.title}</Card.Title>
        <Card.Text className="movie-overview">
          {movie.overview ? 
            (movie.overview.length > 100 ? 
              movie.overview.substring(0, 100) + '...' : 
              movie.overview
            ) : 
            'No description available'
          }
        </Card.Text>
        {movie.releaseDate && (
          <Card.Text className="text-muted small">
            📅 {new Date(movie.releaseDate).getFullYear()}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
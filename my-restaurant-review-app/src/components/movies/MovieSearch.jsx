import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import './MovieSearch.css';

const MovieSearch = ({ onSearch, placeholder = "Search for movies..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="movie-search">
      <InputGroup size="lg">
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="primary" type="submit">
          🔍 Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MovieSearch;
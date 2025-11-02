import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';
import './Spinner.css';

const Spinner = ({ message = 'Loading...' }) => {
  return (
    <div className="spinner-container">
      <BootstrapSpinner animation="border" variant="primary" />
      <p className="mt-3">{message}</p>
    </div>
  );
};

export default Spinner;


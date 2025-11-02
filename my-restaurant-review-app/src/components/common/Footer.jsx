import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-5 py-4">
      <Container>
        <div className="text-center">
          <p className="mb-2">🎬 Cinematix</p>
          <p className="mb-2">
            Absolute cinema experience at your fingertips!
          </p>
          <p className="text-muted small mb-0">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

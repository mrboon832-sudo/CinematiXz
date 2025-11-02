import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    await login(formData.email, formData.password);
    navigate('/');
  };

  const handleRegister = async (formData) => {
    await register(formData.email, formData.password, formData.displayName);
    navigate('/');
  };

  return (
    <Container className="auth-page">
      <div className="auth-container">
        <Card className="auth-card">
          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <h2 className="brand-title">🎬 Movie Reviews</h2>
              <p className="text-muted">Join our community of movie lovers</p>
            </div>

            {isLogin ? (
              <LoginForm 
                onSubmit={handleLogin} 
                onSwitchToRegister={() => setIsLogin(false)}
              />
            ) : (
              <RegisterForm 
                onSubmit={handleRegister} 
                onSwitchToLogin={() => setIsLogin(true)}
              />
            )}
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default AuthPage;

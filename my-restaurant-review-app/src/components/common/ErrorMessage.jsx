import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <Alert variant="danger" dismissible onClose={onClose}>
      <Alert.Heading>Error</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};

export default ErrorMessage;
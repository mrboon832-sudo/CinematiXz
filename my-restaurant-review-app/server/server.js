const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const { errorHandler } = require('./middleware/errorHandler');

// Import routes
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: config.clientUrl,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Restaurant Review API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`
    ╔════════════════════════════════════════╗
    ║  Server running on port ${PORT}         ║
    ║  Environment: ${config.nodeEnv.padEnd(20)} ║
    ║  Client URL: ${config.clientUrl.padEnd(21)} ║
    ╚════════════════════════════════════════╝
  `);
});

module.exports = app;
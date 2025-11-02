const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');
const {
  validate,
  reviewValidation,
  reviewUpdateValidation,
  idValidation,
} = require('../middleware/validator');

// Public routes
router.get('/', reviewController.getAllReviews);
router.get('/:id', idValidation, validate, reviewController.getReview);
router.get('/movie/:movieId', reviewController.getReviewsByMovie);
router.get('/user/:userId', reviewController.getReviewsByUser);

// Protected routes (require authentication)
router.post(
  '/',
  authenticate,
  reviewValidation,
  validate,
  reviewController.createReview
);

router.put(
  '/:id',
  authenticate,
  idValidation,
  reviewUpdateValidation,
  validate,
  reviewController.updateReview
);

router.delete(
  '/:id',
  authenticate,
  idValidation,
  validate,
  reviewController.deleteReview
);

module.exports = router;


const FirebaseService = require('../services/firebaseService');
const Review = require('../models/reviewModel');
const { AppError } = require('../middleware/errorHandler');

const reviewService = new FirebaseService('reviews');
const userService = new FirebaseService('users');

// Get all reviews
exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getAll();
    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// Get single review
exports.getReview = async (req, res, next) => {
  try {
    const review = await reviewService.getById(req.params.id);
    
    if (!review) {
      throw new AppError('Review not found', 404);
    }

    res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// Get reviews by movie
exports.getReviewsByMovie = async (req, res, next) => {
  try {
    const reviews = await reviewService.getByField('movieId', req.params.movieId);
    
    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// Get reviews by user
exports.getReviewsByUser = async (req, res, next) => {
  try {
    const reviews = await reviewService.getByField('userId', req.params.userId);
    
    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// Create review
exports.createReview = async (req, res, next) => {
  try {
    const reviewData = new Review({
      ...req.body,
      userId: req.user.uid,
      userName: req.user.name,
      userEmail: req.user.email,
    });

    const review = await reviewService.create(reviewData.toJSON());

    // Update user's review count
    const user = await userService.getById(req.user.uid);
    if (user) {
      await userService.update(req.user.uid, {
        reviewCount: (user.reviewCount || 0) + 1,
      });
    }

    res.status(201).json({
      success: true,
      data: review,
      message: 'Review created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Update review
exports.updateReview = async (req, res, next) => {
  try {
    const review = await reviewService.getById(req.params.id);
    
    if (!review) {
      throw new AppError('Review not found', 404);
    }

    // Check ownership
    if (review.userId !== req.user.uid) {
      throw new AppError('Not authorized to update this review', 403);
    }

    const updatedReview = await reviewService.update(req.params.id, req.body);

    res.json({
      success: true,
      data: updatedReview,
      message: 'Review updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Delete review
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await reviewService.getById(req.params.id);
    
    if (!review) {
      throw new AppError('Review not found', 404);
    }

    // Check ownership
    if (review.userId !== req.user.uid) {
      throw new AppError('Not authorized to delete this review', 403);
    }

    await reviewService.delete(req.params.id);

    // Update user's review count
    const user = await userService.getById(req.user.uid);
    if (user) {
      await userService.update(req.user.uid, {
        reviewCount: Math.max(0, (user.reviewCount || 0) - 1),
      });
    }

    res.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};


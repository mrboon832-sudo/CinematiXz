const FirebaseService = require('../services/firebaseService');
const User = require('../models/userModel');
const { AppError } = require('../middleware/errorHandler');

const userService = new FirebaseService('users');

// Get user profile
exports.getUserProfile = async (req, res, next) => {
  try {
    let user = await userService.getById(req.user.uid);
    
    if (!user) {
      // Create user profile if it doesn't exist
      const newUser = new User({
        uid: req.user.uid,
        email: req.user.email,
        displayName: req.user.name,
      });
      
      user = await userService.create(newUser.toJSON());
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    const { displayName, photoURL } = req.body;
    
    const updateData = {};
    if (displayName) updateData.displayName = displayName;
    if (photoURL) updateData.photoURL = photoURL;

    const user = await userService.update(req.user.uid, updateData);

    res.json({
      success: true,
      data: user,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID (public)
exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Return only public information
    const publicUser = {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      reviewCount: user.reviewCount,
    };

    res.json({
      success: true,
      data: publicUser,
    });
  } catch (error) {
    next(error);
  }
};


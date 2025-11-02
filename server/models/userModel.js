class User {
  constructor(data) {
    this.uid = data.uid;
    this.email = data.email;
    this.displayName = data.displayName || data.email.split('@')[0];
    this.photoURL = data.photoURL || null;
    this.reviewCount = data.reviewCount || 0;
  }

  // Validate user data
  static validate(data) {
    const errors = [];

    if (!data.uid) errors.push('User ID is required');
    if (!data.email) errors.push('Email is required');

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Convert to plain object for database
  toJSON() {
    return {
      uid: this.uid,
      email: this.email,
      displayName: this.displayName,
      photoURL: this.photoURL,
      reviewCount: this.reviewCount,
    };
  }

  // Increment review count
  incrementReviewCount() {
    this.reviewCount += 1;
  }

  // Decrement review count
  decrementReviewCount() {
    this.reviewCount = Math.max(0, this.reviewCount - 1);
  }
}

module.exports = User;
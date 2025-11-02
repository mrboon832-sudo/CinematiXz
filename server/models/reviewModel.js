class Review {
  constructor(data) {
    this.userId = data.userId;
    this.userName = data.userName;
    this.userEmail = data.userEmail;
    this.movieId = data.movieId;
    this.movieTitle = data.movieTitle;
    this.moviePoster = data.moviePoster || null;
    this.rating = data.rating;
    this.title = data.title;
    this.comment = data.comment;
  }

  // Validate review data
  static validate(data) {
    const errors = [];

    if (!data.movieId) errors.push('Movie ID is required');
    if (!data.movieTitle) errors.push('Movie title is required');
    if (!data.rating || data.rating < 1 || data.rating > 5) {
      errors.push('Rating must be between 1 and 5');
    }
    if (!data.title || data.title.length < 3) {
      errors.push('Title must be at least 3 characters');
    }
    if (!data.comment || data.comment.length < 10) {
      errors.push('Comment must be at least 10 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Convert to plain object for database
  toJSON() {
    return {
      userId: this.userId,
      userName: this.userName,
      userEmail: this.userEmail,
      movieId: this.movieId,
      movieTitle: this.movieTitle,
      moviePoster: this.moviePoster,
      rating: this.rating,
      title: this.title,
      comment: this.comment,
    };
  }
}

module.exports = Review;
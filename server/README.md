# Restaurant Review API - Backend

Backend API for the Restaurant/Movie Review Platform built with Node.js, Express, and Firebase.

## Features

- ✅ RESTful API with Express.js
- ✅ Firebase Firestore database
- ✅ Firebase Authentication
- ✅ TMDB API integration for movie data
- ✅ JWT token authentication
- ✅ Input validation
- ✅ Error handling middleware
- ✅ CORS enabled

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **External API:** The Movie Database (TMDB)
- **Validation:** express-validator

## Installation

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
NODE_ENV=development

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"

# TMDB API
TMDB_API_KEY=your-tmdb-api-key
TMDB_BASE_URL=https://api.themoviedb.org/3

# CORS
CLIENT_URL=http://localhost:3000
```

### 3. Get Required API Keys

#### Firebase Setup:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Go to Project Settings > Service Accounts
4. Click "Generate New Private Key"
5. Copy credentials to `.env`

#### TMDB API Key:
1. Sign up at [TMDB](https://www.themoviedb.org/)
2. Go to Settings > API
3. Request an API key (free)
4. Copy to `.env`

### 4. Run the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET / - API health check
```

### Reviews

```
GET    /api/reviews              - Get all reviews
GET    /api/reviews/:id          - Get single review by ID
GET    /api/reviews/movie/:movieId - Get all reviews for a movie
GET    /api/reviews/user/:userId - Get all reviews by a user
POST   /api/reviews              - Create new review (auth required)
PUT    /api/reviews/:id          - Update review (auth + ownership required)
DELETE /api/reviews/:id          - Delete review (auth + ownership required)
```

### Users

```
GET    /api/users/profile        - Get current user profile (auth required)
PUT    /api/users/profile        - Update user profile (auth required)
GET    /api/users/:id            - Get user by ID (public info only)
```

### Movies

```
GET    /api/movies/popular       - Get popular movies
GET    /api/movies/trending      - Get trending movies
GET    /api/movies/search?query=... - Search movies
GET    /api/movies/:id           - Get movie details
```

## Request/Response Examples

### Create Review

**Request:**
```bash
POST /api/reviews
Authorization: Bearer <firebase-id-token>
Content-Type: application/json

{
  "movieId": "550",
  "movieTitle": "Fight Club",
  "moviePoster": "https://image.tmdb.org/t/p/w500/path.jpg",
  "rating": 5,
  "title": "Absolute Masterpiece",
  "comment": "This movie changed my perspective on cinema..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "review123",
    "userId": "user123",
    "userName": "John Doe",
    "movieId": "550",
    "movieTitle": "Fight Club",
    "rating": 5,
    "title": "Absolute Masterpiece",
    "comment": "This movie changed my perspective...",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Review created successfully"
}
```

### Get Reviews by Movie

**Request:**
```bash
GET /api/reviews/movie/550
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "review123",
      "userName": "John Doe",
      "rating": 5,
      "title": "Absolute Masterpiece",
      "comment": "Amazing film...",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Authentication

The API uses Firebase Authentication. Include the Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase-id-token>
```

Protected routes will verify the token and attach user info to `req.user`.

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // Validation errors (if any)
}
```

## Validation Rules

### Review Creation:
- `movieId`: Required
- `movieTitle`: Required
- `rating`: Integer between 1-5
- `title`: 3-100 characters
- `comment`: 10-1000 characters

## Project Structure

```
server/
├── config/
│   ├── firebase.js      - Firebase Admin SDK setup
│   └── config.js        - Environment configuration
├── controllers/
│   ├── reviewController.js
│   ├── userController.js
│   └── movieController.js
├── routes/
│   ├── reviewRoutes.js
│   ├── userRoutes.js
│   └── movieRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── validator.js
├── models/
│   ├── reviewModel.js
│   └── userModel.js
├── services/
│   ├── firebaseService.js
│   └── externalApiService.js
├── utils/
│   └── helpers.js
├── server.js
├── package.json
└── .env
```

## Database Schema

### Reviews Collection
```javascript
{
  id: "auto-generated",
  userId: "user-id",
  userName: "John Doe",
  userEmail: "john@example.com",
  movieId: "550",
  movieTitle: "Fight Club",
  moviePoster: "url",
  rating: 5,
  title: "Review title",
  comment: "Review content",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

### Users Collection
```javascript
{
  uid: "user-id",
  email: "user@example.com",
  displayName: "John Doe",
  photoURL: "url",
  reviewCount: 5,
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

## Testing

Test the API using:
- Postman
- cURL
- Thunder Client (VS Code extension)

Example cURL:
```bash
curl http://localhost:5000/api/movies/popular
```

## Deployment

### Firebase Functions (Recommended)

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Initialize Firebase:
```bash
firebase init functions
```

3. Deploy:
```bash
firebase deploy --only functions
```

### Alternative: Heroku, Render, Railway

Follow their respective documentation for Node.js deployment.

## Common Issues

**Firebase Connection Error:**
- Verify your service account credentials
- Check if private key has proper line breaks (`\n`)

**TMDB API Error:**
- Verify API key is correct
- Check if you've exceeded rate limits

**CORS Error:**
- Update `CLIENT_URL` in `.env`
- Verify CORS middleware configuration

## License

MIT

## Support

For issues, please check the documentation or contact the development team.
const { db } = require('../config/firebase');
require('dotenv').config();

const sampleReviews = [
  {
    userId: 'user_123',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    movieId: '550',
    movieTitle: 'Fight Club',
    moviePoster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    rating: 5,
    title: 'Absolute Masterpiece',
    comment: 'This movie changed my perspective on cinema. The twist ending is unforgettable and the cinematography is stunning. A must-watch for any film enthusiast.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    userId: 'user_456',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    movieId: '27205',
    movieTitle: 'Inception',
    moviePoster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    rating: 5,
    title: 'Mind-Bending Experience',
    comment: 'Christopher Nolan at his absolute best. The dream sequences are brilliantly executed and the concept is fascinating. Leonardo DiCaprio delivers a powerful performance.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    userId: 'user_789',
    userName: 'Mike Johnson',
    userEmail: 'mike@example.com',
    movieId: '13',
    movieTitle: 'Forrest Gump',
    moviePoster: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    rating: 4,
    title: 'Heartwarming Classic',
    comment: 'Tom Hanks delivers an incredible performance in this beautiful story about life, love, and destiny. Some parts are slow but overall a wonderful film.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    userId: 'user_123',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    movieId: '155',
    movieTitle: 'The Dark Knight',
    moviePoster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    rating: 5,
    title: 'Best Superhero Movie Ever',
    comment: 'Heath Ledger\'s Joker is legendary. This film transcends the superhero genre and becomes a masterpiece of modern cinema.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    userId: 'user_456',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    movieId: '278',
    movieTitle: 'The Shawshank Redemption',
    moviePoster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    rating: 5,
    title: 'Timeless Classic',
    comment: 'A story of hope and friendship that never gets old. Morgan Freeman and Tim Robbins are perfect in their roles.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const sampleUsers = [
  {
    uid: 'user_123',
    email: 'john@example.com',
    displayName: 'John Doe',
    photoURL: null,
    reviewCount: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    uid: 'user_456',
    email: 'jane@example.com',
    displayName: 'Jane Smith',
    photoURL: null,
    reviewCount: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    uid: 'user_789',
    email: 'mike@example.com',
    displayName: 'Mike Johnson',
    photoURL: null,
    reviewCount: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

async function clearDatabase() {
  console.log('🗑️  Clearing existing data...');
  
  // Clear reviews
  const reviewsSnapshot = await db.collection('reviews').get();
  const reviewDeletePromises = reviewsSnapshot.docs.map(doc => doc.ref.delete());
  await Promise.all(reviewDeletePromises);
  console.log(`   Deleted ${reviewsSnapshot.size} reviews`);
  
  // Clear users
  const usersSnapshot = await db.collection('users').get();
  const userDeletePromises = usersSnapshot.docs.map(doc => doc.ref.delete());
  await Promise.all(userDeletePromises);
  console.log(`   Deleted ${usersSnapshot.size} users`);
}

async function seedDatabase() {
  try {
    console.log('\n🌱 Starting database seeding...\n');

    // Option to clear database first
    const args = process.argv.slice(2);
    if (args.includes('--clear')) {
      await clearDatabase();
      console.log('');
    }

    // Add users
    console.log('👥 Adding users...');
    for (const user of sampleUsers) {
      await db.collection('users').doc(user.uid).set(user);
      console.log(`   ✅ ${user.displayName}`);
    }

    // Add reviews
    console.log('\n📝 Adding reviews...');
    for (const review of sampleReviews) {
      await db.collection('reviews').add(review);
      console.log(`   ✅ ${review.title} - ${review.movieTitle}`);
    }

    console.log('\n✨ Database seeded successfully!\n');
    console.log('═══════════════════════════════════════');
    console.log('📊 Summary:');
    console.log(`   • Users: ${sampleUsers.length}`);
    console.log(`   • Reviews: ${sampleReviews.length}`);
    console.log('═══════════════════════════════════════');
    console.log('\n🌐 View your data at:');
    console.log(`   https://console.firebase.google.com/project/${process.env.FIREBASE_PROJECT_ID}/firestore\n`);
    console.log('💡 Or test the API:');
    console.log('   curl http://localhost:5000/api/reviews');
    console.log('   curl http://localhost:5000/api/movies/popular\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   1. Your .env file has correct Firebase credentials');
    console.error('   2. Firestore is enabled in your Firebase project');
    console.error('   3. You have internet connection\n');
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();
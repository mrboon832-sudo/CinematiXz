const tmdbService = require('../services/tmdbService');
require('dotenv').config();

async function testTMDBAPI() {
  console.log('\n🎬 Testing TMDB API Connection...\n');
  console.log('═══════════════════════════════════════');

  try {
    // Test 1: Connection Test
    console.log('\n1️⃣  Testing API Connection...');
    const isConnected = await tmdbService.testConnection();
    if (!isConnected) {
      throw new Error('Failed to connect to TMDB API');
    }
    console.log('   ✅ Connection successful!');

    // Test 2: Popular Movies
    console.log('\n2️⃣  Fetching Popular Movies...');
    const popularMovies = await tmdbService.getPopularMovies(1);
    console.log(`   ✅ Found ${popularMovies.length} popular movies`);
    if (popularMovies.length > 0) {
      console.log(`   📽️  Example: "${popularMovies[0].title}"`);
    }

    // Test 3: Search Movies
    console.log('\n3️⃣  Searching for "Inception"...');
    const searchResults = await tmdbService.searchMovies('Inception');
    console.log(`   ✅ Found ${searchResults.length} results`);
    if (searchResults.length > 0) {
      console.log(`   📽️  Top result: "${searchResults[0].title}"`);
    }

    // Test 4: Movie Details
    console.log('\n4️⃣  Fetching Movie Details (Inception - ID: 27205)...');
    const movieDetails = await tmdbService.getMovieDetails(27205);
    console.log(`   ✅ Got details for: "${movieDetails.title}"`);
    console.log(`   ⭐ Rating: ${movieDetails.rating}/10`);
    console.log(`   🎭 Genres: ${movieDetails.genres.join(', ')}`);
    console.log(`   ⏱️  Runtime: ${movieDetails.runtime} minutes`);

    // Test 5: Trending Movies
    console.log('\n5️⃣  Fetching Trending Movies...');
    const trendingMovies = await tmdbService.getTrendingMovies('week');
    console.log(`   ✅ Found ${trendingMovies.length} trending movies`);

    // Test 6: Genres
    console.log('\n6️⃣  Fetching Movie Genres...');
    const genres = await tmdbService.getGenres();
    console.log(`   ✅ Found ${genres.length} genres`);
    console.log(`   🎭 Examples: ${genres.slice(0, 5).map(g => g.name).join(', ')}`);

    // Summary
    console.log('\n═══════════════════════════════════════');
    console.log('✨ All TMDB API tests passed!');
    console.log('═══════════════════════════════════════\n');
    console.log('💡 Your TMDB API is working correctly!');
    console.log('   You can now use it in your application.\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ TMDB API Test Failed!');
    console.error('═══════════════════════════════════════');
    console.error('Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check your TMDB_API_KEY in .env file');
    console.error('   2. Verify the API key at: https://www.themoviedb.org/settings/api');
    console.error('   3. Make sure you have internet connection');
    console.error('   4. Check if TMDB service is up: https://status.themoviedb.org/\n');
    
    if (error.response) {
      console.error('API Response:', error.response.status, error.response.statusText);
    }
    
    process.exit(1);
  }
}
testTMDBAPI();
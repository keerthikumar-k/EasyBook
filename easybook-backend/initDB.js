const mongoose = require('mongoose');
const Movie = require('./models/Movie');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/easybook')
.then(() => {
  console.log('✅ Connected to MongoDB');
  initializeData();
})
.catch(err => {
  console.log('❌ MongoDB Connection Error:', err);
  process.exit(1);
});

async function initializeData() {
  try {
    // Clear existing data
    await Movie.deleteMany({});
    console.log('🗑️ Cleared existing movies');

    // Sample movies data
    const movies = [
      {
        title: 'Vikram',
        genre: 'Action',
        language: 'Tamil',
        rating: 8.9,
        poster: '/src/images/vikram.jpg',
        duration: 174,
        description: 'Action thriller starring Kamal Haasan',
        showtimes: [
          { theater: 'Sathyam Cinemas', time: '7:00 PM', price: 200 },
          { theater: 'AGS Cinemas', time: '9:30 PM', price: 220 }
        ],
        cities: ['Chennai', 'Coimbatore', 'Madurai']
      },
      {
        title: 'RRR',
        genre: 'Action',
        language: 'Hindi',
        rating: 9.0,
        poster: '/src/images/RRR.jpg',
        duration: 187,
        description: 'Period action drama',
        showtimes: [
          { theater: 'PVR Cinemas', time: '6:00 PM', price: 300 },
          { theater: 'INOX', time: '9:00 PM', price: 320 }
        ],
        cities: ['Mumbai', 'Delhi', 'Bangalore']
      },
      {
        title: 'Jailer',
        genre: 'Action',
        language: 'Tamil',
        rating: 8.7,
        poster: '/src/images/jailer.jpeg',
        duration: 168,
        description: 'Action comedy starring Rajinikanth',
        showtimes: [
          { theater: 'Escape Cinemas', time: '8:00 PM', price: 230 }
        ],
        cities: ['Chennai', 'Coimbatore']
      }
    ];

    // Insert movies
    await Movie.insertMany(movies);
    console.log('✅ Sample movies added to database');
    console.log(`📊 Total movies: ${movies.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing data:', error);
    process.exit(1);
  }
}
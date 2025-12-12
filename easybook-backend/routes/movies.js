const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed movies (for initial setup)
router.post('/seed', async (req, res) => {
  try {
    await Movie.deleteMany({});
    
    const movies = [
      {
        title: 'Spider-Man: No Way Home',
        genre: 'Action/Adventure',
        duration: 148,
        rating: 8.4,
        poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
        description: 'Peter Parker seeks help from Doctor Strange when his identity is revealed.',
        language: 'English',
        showtimes: [
          { time: '10:00 AM', theater: 'PVR Cinemas', price: 200, totalSeats: 250, bookedSeats: 0 },
          { time: '2:00 PM', theater: 'INOX', price: 250, totalSeats: 250, bookedSeats: 0 },
          { time: '6:00 PM', theater: 'Cinepolis', price: 300, totalSeats: 250, bookedSeats: 0 }
        ]
      },
      {
        title: 'RRR',
        genre: 'Action/Drama',
        duration: 187,
        rating: 8.8,
        poster: 'https://image.tmdb.org/t/p/w500/wD6jUjKALBKHmBBMKLRqnlvQgpx.jpg',
        description: 'A tale of two legendary revolutionaries.',
        language: 'Telugu',
        showtimes: [
          { time: '11:00 AM', theater: 'PVR Cinemas', price: 180, totalSeats: 250, bookedSeats: 0 },
          { time: '3:00 PM', theater: 'INOX', price: 220, totalSeats: 250, bookedSeats: 0 },
          { time: '7:00 PM', theater: 'Cinepolis', price: 280, totalSeats: 250, bookedSeats: 0 }
        ]
      },
      {
        title: 'Avengers: Endgame',
        genre: 'Action/Sci-Fi',
        duration: 181,
        rating: 8.4,
        poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
        description: 'The Avengers assemble once more.',
        language: 'English',
        showtimes: [
          { time: '9:30 AM', theater: 'PVR Cinemas', price: 220, totalSeats: 250, bookedSeats: 0 },
          { time: '1:30 PM', theater: 'INOX', price: 270, totalSeats: 250, bookedSeats: 0 },
          { time: '5:30 PM', theater: 'Cinepolis', price: 320, totalSeats: 250, bookedSeats: 0 }
        ]
      }
    ];

    await Movie.insertMany(movies);
    res.json({ message: 'Movies seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
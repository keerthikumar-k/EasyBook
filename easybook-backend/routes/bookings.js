const express = require('express');
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { movieId, showtime, theater, seats, totalPrice } = req.body;

    // Find movie and showtime
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const showtimeData = movie.showtimes.find(st => st.time === showtime && st.theater === theater);
    if (!showtimeData) {
      return res.status(404).json({ message: 'Showtime not found' });
    }

    // Check seat availability
    if (showtimeData.bookedSeats + seats > showtimeData.totalSeats) {
      return res.status(400).json({ 
        message: `Only ${showtimeData.totalSeats - showtimeData.bookedSeats} seats available` 
      });
    }

    // Create booking
    const booking = new Booking({
      user: req.user._id,
      movie: movieId,
      showtime,
      theater,
      seats,
      totalPrice
    });

    await booking.save();

    // Update movie booked seats
    showtimeData.bookedSeats += seats;
    movie.totalBookings += seats;
    await movie.save();

    // Update user total bookings
    req.user.totalBookings += seats;
    await req.user.save();

    await booking.populate('movie');

    res.status(201).json({
      message: 'Booking confirmed successfully',
      booking: {
        id: booking._id,
        bookingId: booking.bookingId,
        movie: booking.movie.title,
        showtime: booking.showtime,
        theater: booking.theater,
        seats: booking.seats,
        totalPrice: booking.totalPrice,
        bookingDate: booking.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('movie')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get booking by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    }).populate('movie');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');

// Create new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    const populatedBooking = await Booking.findById(savedBooking._id).populate('movieId');
    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get bookings by email
router.get('/:email', async (req, res) => {
  try {
    const bookings = await Booking.find({ userEmail: req.params.email }).populate('movieId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get booking by ID
router.get('/booking/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('movieId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  showtimes: [{
    time: String,
    theater: String,
    price: Number,
    totalSeats: {
      type: Number,
      default: 250
    },
    bookedSeats: {
      type: Number,
      default: 0
    }
  }],
  totalBookings: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
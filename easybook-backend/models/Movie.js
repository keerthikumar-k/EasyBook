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
  language: {
    type: String,
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
  duration: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  showtimes: [{
    theater: String,
    time: String,
    price: Number
  }],
  cities: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
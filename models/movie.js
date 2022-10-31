const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return validator.isURL(v);
      },
      message: 'это не ссылка',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return validator.isURL(v);
      },
      message: 'это не ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return validator.isURL(v);
      },
      message: 'это не ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('Movie', movieSchema);

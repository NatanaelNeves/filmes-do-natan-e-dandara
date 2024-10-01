const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  poster_path: String,
  rating: Number, // Nota do filme
  review: String, // Avaliação do filme
  watchedDate: Date, // Data em que o filme foi assistido
  watched: Boolean,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

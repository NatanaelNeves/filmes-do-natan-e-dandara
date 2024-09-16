const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  poster_path: String,
  watched: Boolean,
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;

const mongoose = require('mongoose');

// Define a estrutura do modelo de filme
const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Título é obrigatório
  },
  poster_path: {
    type: String,
    required: true, // Caminho do pôster é obrigatório
  },
  rating: {
    type: Number,
    min: 1,
    max: 5, // Avaliação entre 1 e 5
  },
  review: {
    type: String,
    default: '', // Avaliação/opinião opcional
  },
  watchedDate: {
    type: Date,
    default: Date.now, // Data padrão é a data atual
  },
  watched: {
    type: Boolean,
    default: false, // Indica se o filme foi assistido ou não
  },
});

// Cria e exporta o modelo Movie
module.exports = mongoose.model('Movie', MovieSchema);


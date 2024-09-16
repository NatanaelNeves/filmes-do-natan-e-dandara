const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express(); // Inicialize o app ANTES de usar app.get()

app.use(express.json()); // Para que o app entenda requisições com JSON

mongoose.connect('mongodb://localhost:27017/filmes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Model de filme
const Movie = require('./models/Movie');

// Rota para buscar filmes assistidos
app.get('/api/watched-movies', async (req, res) => {
  const movies = await Movie.find({ watched: true });
  res.json(movies);
});

// Rota para adicionar filme assistido
app.post('/api/add-watched', async (req, res) => {
  const { movie } = req.body;
  const newMovie = new Movie({
    title: movie.title,
    poster_path: movie.poster_path,
    watched: true,
  });
  await newMovie.save();
  const movies = await Movie.find({ watched: true });
  res.json(movies);
});

// Rota para buscar filmes na API do TMDb
app.get('/api/search-movie', async (req, res) => {
  const query = req.query.query;
  const API_KEY = 'sua-chave-da-api-tmdb'; // Lembre-se de substituir pela sua chave real
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
  res.json(response.data);
});

// Inicie o servidor
app.listen(5000, () => {
  console.log('Server running on port 5000');
});

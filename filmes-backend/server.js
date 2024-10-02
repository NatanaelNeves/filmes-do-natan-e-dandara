const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

// Inicializa o app
const app = express();

app.use(express.json()); // Para o app entender requisições com JSON

// Conexão com MongoDB (Certifique-se de que as credenciais e a string de conexão estão corretas)
mongoose.connect('mongodb+srv://natanaelnevesalves:20012003n@sitefilme.dfgdz.mongodb.net/?retryWrites=true&w=majority&appName=sitefilme', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Model de Filme
const Movie = require('./models/Movie'); // Certifique-se de que o modelo Movie está no caminho correto

// Rota para buscar filmes assistidos
app.get('/api/watched-movies', async (req, res) => {
  try {
    const movies = await Movie.find({ watched: true });
    res.json(movies);
  } catch (error) {
    console.error('Erro ao buscar filmes assistidos:', error);
    res.status(500).send('Erro ao buscar filmes assistidos');
  }
});

// Rota para adicionar filme assistido com avaliação, nota e data
app.post('/api/add-watched', async (req, res) => {
  const { movie, rating, review, watchedDate } = req.body;
  try {
    const newMovie = new Movie({
      title: movie.title,
      poster_path: movie.poster_path,
      rating: rating,        // Nota dada ao filme
      review: review,        // Avaliação/opinião
      watchedDate: watchedDate, // Data em que assistiu
      watched: true,
    });
    await newMovie.save();
    const movies = await Movie.find({ watched: true });
    res.json(movies);
  } catch (error) {
    console.error('Erro ao adicionar filme assistido:', error);
    res.status(500).send('Erro ao adicionar filme assistido');
  }
});

// Rota para buscar filmes na API do TMDb
app.get('/api/search-movie', async (req, res) => {
  const query = req.query.query;
  const API_KEY = '8840197db39bff165f9e2f93cde37400'; // Substitua pela sua chave real
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar filmes na API:', error);
    res.status(500).send('Erro ao buscar filmes');
  }
});

// Inicia o servidor
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});


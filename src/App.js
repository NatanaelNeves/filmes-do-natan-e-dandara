import React, { useState } from 'react';
import axios from 'axios';
import SearchMovies from './components/SearchMovies';
import WatchedMovies from './components/WatchedMovies';
import './App.css';

const App = () => {
  const [watchedMovies, setWatchedMovies] = useState([]);

  const handleAddMovie = async (movie) => {
    const rating = prompt("Avalie o filme com uma nota de 1 a 5:");
    const watchedDate = prompt("Insira a data que você assistiu o filme (ex: 2024-10-02):");
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/add-watched`, { 
        movie, 
        rating, 
        watchedDate 
      });
      setWatchedMovies([...watchedMovies, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar filme assistido:", error);
    }
  };

  return (
    <div>
      <h1>Filmes do Natan e Dandara</h1>
      <SearchMovies onAddMovie={handleAddMovie} />
      <WatchedMovies />
    </div>
  );
};

export default App;


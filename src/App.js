import React, { useState } from 'react';
import axios from 'axios';
import SearchMovies from './components/SearchMovies';
import WatchedMovies from './components/WatchedMovies';
import './App.css';

const App = () => {
  const [watchedMovies, setWatchedMovies] = useState([]);

  const handleAddMovie = async (movie) => {
    const rating = prompt("Avalie o filme com uma nota de 1 a 5:");
    const watchedDate = new Date();
    const response = await axios.post('/api/add-watched', { movie, rating, watchedDate });
    setWatchedMovies([...watchedMovies, response.data]);
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

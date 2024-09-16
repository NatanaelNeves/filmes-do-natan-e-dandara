import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WatchedMovies from './WatchedMovies';
import axios from 'axios';

const HomePage = () => {
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    axios.get('/api/watched-movies')
      .then(response => setWatchedMovies(response.data));
  }, []);

  return (
    <div>
      <h1>Filmes do Natan e Dandara</h1>
      <SearchBar setWatchedMovies={setWatchedMovies} />
      <WatchedMovies movies={watchedMovies} />
    </div>
  );
};

export default HomePage;

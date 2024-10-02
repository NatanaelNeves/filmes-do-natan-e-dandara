import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WatchedMovies = () => {
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    const fetchWatchedMovies = async () => {
      const response = await axios.get('/api/watched-movies');
      setWatchedMovies(response.data);
    };
    fetchWatchedMovies();
  }, []);

  return (
    <div>
      <h2>Filmes Assistidos</h2>
      <div>
        {watchedMovies.map((movie) => (
          <div key={movie._id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <h4>Assistido em: {new Date(movie.watchedDate).toLocaleDateString()}</h4>
            <h4>Nota: {movie.rating}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchedMovies;

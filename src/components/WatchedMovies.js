import React from 'react';

const WatchedMovies = ({ movies }) => {
  return (
    <div>
      <h2>Filmes Assistidos</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchedMovies;

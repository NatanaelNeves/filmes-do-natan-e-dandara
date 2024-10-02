import React, { useState } from 'react';
import axios from 'axios';

const SearchMovies = ({ onAddMovie }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    console.log('API URL:', process.env.REACT_APP_API_URL); // Verifica se a URL está correta
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/search-movie?query=${query}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      setError('Erro ao buscar filmes. Tente novamente.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pesquisar filmes"
      />
      <button onClick={handleSearch}>Buscar</button>
      {error && <p>{error}</p>}
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <button onClick={() => onAddMovie(movie)}>Adicionar como assistido</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;




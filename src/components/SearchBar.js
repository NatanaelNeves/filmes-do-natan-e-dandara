import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setWatchedMovies }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    axios.get(`/api/search-movie?query=${searchTerm}`)
      .then(response => {
        const movie = response.data.results[0];
        axios.post('/api/add-watched', { movie })
          .then(response => setWatchedMovies(response.data));
      });
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar filme"
      />
      <button onClick={handleSearch}>Adicionar</button>
    </div>
  );
};

export default SearchBar;

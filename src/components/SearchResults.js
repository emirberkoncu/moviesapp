import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from './MovieList';

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const apiKey = '3f6e73a6bb66dca3b3b721ba203104b1';
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error('Hata:', error);
      }
    };

    fetchSearchResults();
  }, [query]); // Sadece query değiştiğinde tekrar çağır

  return (
    <div>
      <MovieList movies={searchResults} />
    </div>
  );
};

export default SearchResults;

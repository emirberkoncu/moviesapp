// src/components/HomePage.js
import React from 'react';
import MovieList from './MovieList';
import { Link } from 'react-router-dom';

const HomePage = ({ popularMovies, topRatedMovies, latestMovies }) => {
  const renderMovies = (movies) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            className="movie-card p-2 bg-white shadow-lg rounded-md"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md mb-2"
            />
            <h3 className="font-bold text-lg">{movie.title}</h3>
            <p className="text-gray-500">{movie.release_date.split('-')[0]}</p>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mt-6">Popüler Filmler</h2>
      {renderMovies(popularMovies)}

      <h2 className="text-2xl font-bold mt-6">En Yüksek Puanlı Filmler</h2>
      {renderMovies(topRatedMovies)}

      <h2 className="text-2xl font-bold mt-6">Son Çıkan Filmler</h2>
      {renderMovies(latestMovies)}
    </div>
  );
};

export default HomePage;

import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = ({ movie }) => {
  // Oyuncuları birleştirip tek bir string oluştur
  const cast = movie.cast ? movie.cast.slice(0, 10).join(', ') : 'Bilinmiyor';
  return (
    <div className="movie-item border rounded-lg overflow-hidden shadow-md m-2 bg-white">
      <Link to={`/movies/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-60 object-contain"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-1">{movie.title}</h2>
          <p className="text-gray-600 mb-1">
            {movie.release_date.substring(0, 4)}
          </p>
          <p className="text-gray-700 font-semibold mb-2">Oyuncular: {cast}</p>
          <p className="text-gray-700">{movie.overview}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieItem;

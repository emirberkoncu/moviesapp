import React, { useEffect, useState } from 'react';
import MovieItem from './MovieItem';
import Error from './Error';

const MovieList = ({ movies }) => {
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const detailsPromises = movies.map(async (movie) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=3f6e73a6bb66dca3b3b721ba203104b1&append_to_response=credits`
        );
        const data = await response.json();
        return {
          id: data.id,
          title: data.title,
          release_date: data.release_date,
          overview: data.overview,
          poster_path: data.poster_path,
          cast: data.credits.cast.map((actor) => actor.name), // Oyuncuları al
        };
      });

      const movieDetailsArray = await Promise.all(detailsPromises);
      setMovieDetails(movieDetailsArray);
    };

    if (movies.length) {
      fetchMovieDetails();
    }
  }, [movies]);

  return (
    <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {movieDetails.length > 0 ? (
        movieDetails.map((movie) => <MovieItem key={movie.id} movie={movie} />)
      ) : (
        <Error />
      )}
    </div>
  );
};

export default MovieList;

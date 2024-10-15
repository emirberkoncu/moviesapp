import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RandomFilms = ({ apiKey, excludeId }) => {
  const [randomMovies, setRandomMovies] = useState([]);

  const fetchRandomMovies = async () => {
    try {
      const popularResponse = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      const popularData = await popularResponse.json();
      const shuffledMovies = popularData.results
        .filter((movie) => movie.id !== excludeId) // Geçerli filmi hariç tut
        .sort(() => 0.5 - Math.random()); // Filmleri karıştır
      setRandomMovies(shuffledMovies.slice(0, 4)); // İlk 4 rastgele filmi al
    } catch (error) {
      console.error('Rastgele filmler alınırken bir hata oluştu:', error);
    }
  };

  useEffect(() => {
    fetchRandomMovies();
  }, [excludeId]); // excludeId değiştiğinde rastgele filmleri güncelle

  return (
    <div className="random-movies mt-2">
      <h2 className="text-lg font-bold">Göz atmaya ne dersin ?</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {randomMovies.map((randomMovie) => (
          <div
            key={randomMovie.id}
            className="random-movie-card bg-gray-100 rounded-lg"
          >
            <Link to={`/movies/${randomMovie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
                alt={randomMovie.title}
                className="w-full h-[230px] object-fill rounded-lg"
              />
              <h3 className="text-lg font-bold mt-2">{randomMovie.title}</h3>
              <p className="text-sm mt-1">
                {randomMovie.release_date.split('-')[0]}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomFilms;

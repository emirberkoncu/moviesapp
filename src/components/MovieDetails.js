import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RandomFilms from './RandomFilms'; // RandomFilms bileşenini ekleyin

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const apiKey = '3f6e73a6bb66dca3b3b721ba203104b1';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`
        );
        const data = await response.json();
        setMovie(data);

        const trailerResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
        );
        const trailerData = await trailerResponse.json();
        if (trailerData.results.length > 0) {
          setTrailer(trailerData.results[0]);
        }
      } catch (error) {
        console.error('Film detayları alınırken bir hata oluştu:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Yükleniyor...</div>;
  }

  const director = movie.credits.crew.find(
    (crewMember) => crewMember.job === 'Director'
  );

  const cast = movie.credits.cast.slice(0, 5);

  return (
    <div className="movie-details p-4 mb-4 ">
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Sol sütun: Poster veya Trailer */}
        <div className="w-full md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-[1000px] rounded-lg"
          />
        </div>

        {/* Sağ sütun: Film Detayları */}
        <div className="w-full  md:w-2/3">
          <h1 className="text-2xl font-bold">
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {movie.title}
            </a>
          </h1>
          <p className="mt-4">{movie.overview}</p>
          <div className="mt-4">
            <span className="font-bold">Yayın Yılı:</span>{' '}
            {movie.release_date.split('-')[0]} {/* Yıl */}
          </div>
          <div className="mt-2">
            <span className="font-bold">IMDB:</span>{' '}
            {movie.vote_average.toFixed(1)}
          </div>
          <div className="mt-2">
            <span className="font-bold">Yönetmen:</span>{' '}
            {director ? director.name : 'Bilgi yok'}
          </div>

          <div className="mt-2">
            <span className="font-bold">Tür:</span>{' '}
            {movie.genres.map((genre) => genre.name).join(', ')}
          </div>
          {/* Oyuncular */}
          <div className="mt-2">
            <span className="font-bold">Oyuncular:</span>
            <div className="cast mt-2 grid grid-cols-3 gap-2">
              {cast.map((actor) => (
                <div key={actor.id} className="cast-member text-center">
                  {actor.profile_path ? (
                    <img
                      style={{ borderRadius: '50px' }}
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="w-24 h-24 mx-auto"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mx-auto">
                      <span className="text-gray-500"></span>
                    </div>
                  )}
                  <p className="mt-2">{actor.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rastgele Filmler */}
          <RandomFilms apiKey={apiKey} excludeId={movie.id} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

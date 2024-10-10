import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
  const cast = movie.credits.cast
    .slice(0, 5)
    .map((actor) => actor.name)
    .join(', '); // İlk 5 oyuncuyu al

  return (
    <div className="movie-details p-4">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      {trailer ? (
        <div className="trailer mt-4">
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-2/4 rounded-lg my-4"
        />
      )}
      <p>{movie.overview}</p>
      <div className="mt-4">
        <span className="font-bold">Yayın Yılı:</span>{' '}
        {movie.release_date.split('-')[0]} {/* Yıl */}
      </div>
      <div className="mt-2">
        <span className="font-bold">IMDB:</span> {movie.vote_average.toFixed(1)}
      </div>
      <div className="mt-2">
        <span className="font-bold">Yönetmen:</span>{' '}
        {director ? director.name : 'Bilgi yok'}
      </div>
      <div className="mt-2">
        <span className="font-bold">Oyuncular:</span> {cast || 'Bilgi yok'}
      </div>
      <div className="mt-2">
        <span className="font-bold">Tür:</span>{' '}
        {movie.genres.map((genre) => genre.name).join(', ')}
      </div>
    </div>
  );
};

export default MovieDetails;

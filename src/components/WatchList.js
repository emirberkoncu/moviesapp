import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WatchList = ({ watchList: initialWatchList, removeFromWatchList }) => {
  const [watchList, setWatchList] = useState(initialWatchList || []);
  const [watchedMovies, setWatchedMovies] = useState({});

  useEffect(() => {
    const savedWatchList = localStorage.getItem('watchList');
    const savedWatchedMovies = localStorage.getItem('watchedMovies');

    if (savedWatchList) {
      setWatchList(JSON.parse(savedWatchList));
    } else {
      setWatchList([]);
    }

    if (savedWatchedMovies) {
      setWatchedMovies(JSON.parse(savedWatchedMovies));
    } else {
      setWatchedMovies({});
    }
  }, []);

  useEffect(() => {
    console.log('Saving watch list to local storage...');
    localStorage.setItem('watchList', JSON.stringify(watchList));
  }, [watchList]);

  useEffect(() => {
    console.log('Saving watched movies to local storage...');
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  const toggleWatched = (movieId) => {
    setWatchedMovies((prev) => ({
      ...prev,
      [movieId]: !prev[movieId],
    }));
  };

  const handleRemoveFromWatchList = (movieId) => {
    setWatchList((prev) => prev.filter((movie) => movie.id !== movieId));
    removeFromWatchList(movieId);
  };

  const handleAddToWatchList = (newMovie) => {
    console.log('Adding movie to watch list...');
    setWatchList((prev) => [...prev, newMovie]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Watch List
        </h2>
        {watchList.length === 0 ? (
          <p className="text-gray-500 text-center">
            Henüz izleme listenizde film yok.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {watchList.map((movie) => (
              <div
                key={movie.id}
                className={`flex flex-col items-center p-3 rounded-lg shadow transition-colors duration-300 ${
                  watchedMovies[movie.id] ? 'bg-green-100' : 'bg-gray-50'
                }`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-32 h-48 object-cover rounded-md mb-2"
                />
                <Link
                  to={`/movies/${movie.id}`}
                  className="text-md font-semibold text-blue-600 hover:underline text-center line-clamp-1"
                >
                  {movie.title}
                </Link>
                <p className="text-sm text-gray-600 mb-2">
                  {movie.release_date
                    ? movie.release_date.split('-')[0]
                    : 'N/A'}
                </p>
                <div className="flex space-x-2 mt-1">
                  <button
                    onClick={() => handleRemoveFromWatchList(movie.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                  >
                    Kaldır
                  </button>
                  <button
                    onClick={() => toggleWatched(movie.id)}
                    className={`px-3 py-1 text-sm text-white rounded transition duration-300 ${
                      watchedMovies[movie.id]
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {watchedMovies[movie.id] ? 'İzlendi' : 'İzledim'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchList;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import HomePage from './components/HomePage'; // Yeni eklenen bileşen
import Header from './components/Header';
import WatchList from './components/WatchList';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const apiKey = '3f6e73a6bb66dca3b3b721ba203104b1';

  // Kategoriler için film verilerini al
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
      );
      const data = await response.json();
      setGenres(data.genres);
    };

    const fetchPopularMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      const data = await response.json();
      setPopularMovies(data.results.slice(0, 5)); // İlk 5 filmi al
    };

    const fetchTopRatedMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
      );
      const data = await response.json();
      setTopRatedMovies(data.results.slice(0, 5)); // İlk 5 filmi al
    };

    const fetchLatestMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
      );
      const data = await response.json();
      setLatestMovies(data.results.slice(0, 5)); // İlk 5 filmi al
    };

    fetchGenres();
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchLatestMovies();
  }, []);

  const handleSearch = (query) => {
    const genreFilter = selectedGenre ? `&with_genres=${selectedGenre}` : '';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}${genreFilter}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
      })
      .catch((error) => {
        console.error('Hata:', error);
      });
  };
  const addToWatchList = (movie) => {
    setWatchList((prevList) => {
      if (!prevList.some((item) => item.id === movie.id)) {
        return [...prevList, movie];
      }
      return prevList;
    });
  };

  const removeFromWatchList = (movieId) => {
    setWatchList((prevList) =>
      prevList.filter((movie) => movie.id !== movieId)
    );
  };

  return (
    <Router className="min-h-screen bg-gray-100 m-4">
      <div>
        {/* <SearchBar
          onSearch={handleSearch}
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        /> */}
        <Header
          onSearch={handleSearch}
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                popularMovies={popularMovies}
                topRatedMovies={topRatedMovies}
                latestMovies={latestMovies}
              />
            }
          />
          <Route
            path="/search/:query"
            element={<MovieList movies={searchResults} />}
          />
          <Route
            path="/movies/:id"
            element={<MovieDetails addToWatchlist={addToWatchList} />}
          />
          <Route
            exact
            path="/watchlist"
            element={
              <WatchList
                watchList={watchList}
                removeFromWatchList={removeFromWatchList}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

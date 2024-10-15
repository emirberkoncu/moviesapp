import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = ({ onSearch, genres, selectedGenre, setSelectedGenre }) => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between p-4">
      {/* Logo */}
      <div className="text-xl font-bold mb-2 md:mb-0">
        <Link to="/">Movie</Link>
      </div>

      {/* Arama Çubuğu */}
      <div className="flex-1 w-full max-w-[900px] mx-2">
        {' '}
        {/* Mobil görünüm için tam genişlik */}
        <SearchBar
          onSearch={onSearch}
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </div>

      {/* Watch List Link */}
      <div>
        <Link to="/watchlist" className="text-lg font-semibold">
          Watch List
        </Link>
      </div>
    </header>
  );
};

export default Header;

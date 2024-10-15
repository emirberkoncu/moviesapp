import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); // useNavigate'i tanımlıyoruz

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    navigate(`/search/${query}`); // Yeni sayfaya yönlendirme yapıyoruz
    setQuery(''); // Arama yapıldıktan sonra inputu temizle
  };

  const handleIconClick = () => {
    handleSearch({ preventDefault: () => {} }); // İkon tıklandığında arama yap
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center justify-center">
      <div className="relative w-5/6">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Film adı ile ara..."
          className="border  p-2 pr-10 rounded w-[900px] "
        />
        <span className="absolute left-[870px] top-2 text-gray-500 hover:text-blue-400 cursor-pointer">
          <i onClick={handleIconClick} className="fas fa-search"></i>{' '}
        </span>
      </div>
    </form>
  );
};

export default SearchBar;

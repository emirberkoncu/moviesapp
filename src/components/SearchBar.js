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
          className="border p-2 rounded w-full" // Soldan padding ekleyin
        />
        <span className="absolute right-2 top-2 text-gray-500 hover:text-blue-400 cursor-pointer">
          <i onClick={handleIconClick} className="fas fa-search"></i>{' '}
        </span>
      </div>
    </form>
  );
};

export default SearchBar;

import { useState } from 'react';
import { Search } from "lucide-react";

export const SearchBar = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearchChange(searchTerm);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full sm:w-96">
        <input
          type="text"
          placeholder="Busca servicios o entrenadores..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#da1641] pr-16"
        />
        <button
          onClick={handleSearchSubmit}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-[#da1641] px-4 py-2 rounded-full hover:bg-white hover:text-[#C30D35] transition duration-300 flex items-center"
        >
          <span className="mr-2">Buscar</span>
          <Search size={20} />
        </button>
      </div>
    </div>
  );
};
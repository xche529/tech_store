import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

const SearchArea = ({ onSearch, onCategoryChange, onSortChange }) => {
  const [newItemOverlayOpen, setNewItemOverlayOpen] = useState(false);
  const [sortBy, setSortBy] = useState('price_asc'); // Default sort by price ascending

  const toggleNewItemOverlay = () => {
    setNewItemOverlayOpen(!newItemOverlayOpen);
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    onSearch(searchTerm);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    onCategoryChange(selectedCategory);
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    onSortChange(selectedSort);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <div className="w-1/2 border-2 border-black flex items-center px-4 h-10 rounded-lg bg-white shadow-md">
        <span className="material-symbols-outlined search">search</span>
        <input
          type="text"
          placeholder="Enter Product Name"
          onChange={handleSearchChange}
          className="w-full bg-transparent border-none text-base ml-1 focus:outline-none"
        />
      </div>

      <button
        onClick={toggleNewItemOverlay}
        className="rounded-md border border-2 border-black transition ease-in-out duration-200 hover:scale-105 p-2"
      >
        <FontAwesomeIcon icon={faTag} size="2x" />
      </button>

<div className='flex mb-4 gap-x-4'>
      <div>
        <label>Category: </label>
        <select
          id="category"
          onChange={handleCategoryChange}
          className="p-1 border border-gray-300 rounded"
        >
          <option value="">All Categories</option>
          <option value="phone">Phone</option>
          <option value="laptop">Laptop</option>
          <option value="tablet">Tablet</option>
          <option value="accessory">Accessory</option>
          <option value="camera">Camera</option>
        </select>
      </div>

      <div>
        <label>Sort by: </label>
        <select
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
          className="p-1 border border-gray-300 rounded"
        >
          <option value="price_asc">Price (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
        </select>
      </div>
     </div>
    </div>
  );
};

export default SearchArea;



  


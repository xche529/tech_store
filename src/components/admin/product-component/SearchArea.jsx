import React from "react";

const SearchArea = ({ onSearch, onCategoryChange }) => {
    const handleSearchChange = (e) => {
      const searchTerm = e.target.value;
      onSearch(searchTerm);
    };
  
    const handleCategoryChange = (e) => {
      const selectedCategory = e.target.value;
      onCategoryChange(selectedCategory);
    };
  
    return (
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Enter Product Name"
            onChange={handleSearchChange}
            className="text-md w-full p-4 border border-gray-300 rounded"
          />
        </div>
        <div className="w-1/2">
          <label>Category:  </label>
          <select
            id="category"
            onChange={handleCategoryChange}
            className="p-1 border border-gray-300 rounded"
          >
            <option value="">All Categories</option>
            <option value="phone">Phone</option>
            <option value="laptop">Laptop</option>
          </select>
        </div>
      </div>
    );
  };
  
  export default SearchArea;
  


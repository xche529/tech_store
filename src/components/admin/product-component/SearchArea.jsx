import React from "react";
import "../../../css/admin-search.css";

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
    <div className="search-and-filter">
      <input
        className="search-box"
        type="text"
        placeholder="Enter Product Name"
        onChange={handleSearchChange}
      />
      <div className="cat-component">
      <label className="category">Category:</label>
      <select id="category" onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="phone">Phone</option>
        <option value="laptop">Laptop</option>
      </select>
      </div>
    </div>
  );
};

export default SearchArea;



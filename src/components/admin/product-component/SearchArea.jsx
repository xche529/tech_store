import React from "react";



const SearchArea = () => {
  
    return (
        <div class="search-and-filter">
        <label for="search">Search:</label>
        <input id="search" type="text" placeholder="Search products...">
        </input>
        <label for="category">Category:</label>
        <select id="category">
          <option value="">All Categories</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
        </select>
      </div>
    );
};
    export default SearchArea;


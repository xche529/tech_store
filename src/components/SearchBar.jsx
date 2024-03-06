import React from "react";
import { useState, useEffect } from 'react';

import "../css/search-bar.css";



export const SearchBar = ({ onSearch }) => {

    const [searchString, setSearchString] = useState(null);

    const handleInputChange = (event) => {
        console.log('value:', event.target.value);
        setSearchString(event.target.value);
    };

    const handleKeyPress = (event) => {
        console.log('event:', event, searchString);
        if (event.key === 'Enter') {
            if (searchString !== null) {
                onSearch(searchString);
            }
        }
    };

    return (
        <div className="search-container">
            <span className="material-symbols-outlined search">
                search
            </span>
            <input placeholder="Search..." onKeyUp={handleKeyPress} onChange={handleInputChange} />
        </div>
    );
}
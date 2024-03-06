import React from "react";

import "../css/search-bar.css";



export const SearchBar = () => {
    return (
        <div className="search-container">
            <span className="material-symbols-outlined search">
               search
            </span>
        <input  placeholder="Search..." />
        </div>
);
}
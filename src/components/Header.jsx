import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import meme from '../images/meme.jpg';
import '../css/header.css';
import { useAuth } from '../context/authContext';


function Header() {
  const { user } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Use state to track dropdown open state
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // Toggle dropdown state
  };
  if (user) console.log('user:', user);
  return (
    <nav className="nav-bar">
      <div className="logo_icon">
        <Link to="/" className='link'>        <img className="logo" src={meme} alt="" />
        </Link>
        <a>CSZ Tech</a>
      </div>
      <ul className={`menu ${isDropdownOpen ? 'open' : ''}`} onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
        <li className='cat_text'>
          Categories
          <span className={`material-symbols-outlined expand_more ${isDropdownOpen ? 'rotate-180' : ''}`}>
            expand_more
          </span>
          <ul>
            <li>Tablet</li>
            <li>Phone</li>
            <li>Laptop</li>
            <li>Accessories</li>
          </ul>
        </li>
      </ul>
      <div className="search_pkg">
        <input className="search_input" type="text" placeholder="Search products, brands, and more..." />
        <button className="search_button" type="submit">
          Search
        </button>
      </div>
      <ul className="nav_links">
        <li>About</li>
        <li>Contact</li>
      </ul><div> {user ? (<div>{user.email}</div>) : (<Link to="/login" className='link-to-normal'>
        SignIn
      </Link>
      )}</div>

      <div className="icon">
        <Link to="/items">
          <span className="material-symbols-outlined account">account_circle</span>
        </Link>
        <span className="material-symbols-outlined watchlist">favorite</span>
        <Link to="/cart">
          <span className="material-symbols-outlined cart">shopping_cart</span>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
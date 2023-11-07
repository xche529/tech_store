import React from 'react';
import { Link } from "react-router-dom";
import meme from '../images/meme.jpg';
import '../css/header.css';

const Header = () => {
return (
<nav className='nav-bar'>
       <div className='logo_icon'>
         <img className='logo'src={meme} alt='' />
		 <a>CSZ TECH</a>
	   </div>
       <text className='category'>Categories</text>
    <div className='search_pkg'>
       <input className='search_input' type='text' placeholder='Search' />
       <button className='search_icon' type='submit'>Search</button>
    </div>
	<span class="material-symbols-outlined">&#xE8B6;</span>
    <ul className='nav_links'>
       <li>About</li>
       <li>Contact</li> 
	  
    </ul>
		
</nav>
    );
}

export default Header;
    

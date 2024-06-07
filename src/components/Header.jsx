import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import {  useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faStore, faHeart} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/authContext';
import { SearchBar } from './SearchBar';
import LogIn from './account/LogIn';


function Header() {
  const navigate = useNavigate();

  const { user, userDetail } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false); 
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // Toggle dropdown state
  };

  const toggleOverlay = () => {
    setOverlayOpen(!isOverlayOpen); // Toggle overlay state
  };


  const onSearch = (string) => {
    if(typeof string === 'string'){
      navigate('/home/' + string)
    }
  }


  return (
 <div className='flex flex-col justify-cneter item-center mb-4'>
 <div>
    <div className='my-10 flex justify-between'>
      {/* <div className='ml-20'>
        <Link to="/" className='link'>        
        <img className="w-44" src={logo} alt="logo-picture" />
        </Link>
      </div> */}

      <div className="space-x-4">
       {/* {user ? (<Link to="/profile" className='link-to-normal'>
        {userDetail ? (userDetail.avatar ? (
          <img src={userDetail.avatar} alt="Avatar" className="avatar" />
        ) : (user.email)) : (user.email)}
      </Link>) : (<Link to="/login" className='link-to-normal'> */}
      <button  onClick={toggleOverlay} class="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
        Account  <Link to="/items">
        <FontAwesomeIcon icon={faUser}/>
        </Link>
      </button>
      <button class="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
        About <FontAwesomeIcon icon={faStore} />
       </button>
       </div>

    <div className='mr-20 space-x-4'>
       <button class="px-3 py-3 bg-black text-white font-bold rounded-2xl transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
        Cart<Link to="/cart">
          <span className="material-symbols-outlined cart">shopping_cart</span>
        </Link>
       </button>
       <button class="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
        Watchlist  <Link to="/cart">
          <FontAwesomeIcon icon={faHeart} />
        </Link>
       </button>
     </div>


     {/* <ul className={`menu ${isDropdownOpen ? 'open' : ''}`} onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
        <li className='cat_text'>
          Categories
          <span className={`material-symbols-outlined expand_more ${isDropdownOpen ? 'rotate-180' : ''}`}>
            expand_more
          </span>
          <ul>
            <li><Link to="/home/tablet" className='link-to-normal'>Tablet</Link></li>
            <li><Link to="/home/phone" className='link-to-normal'>Phone</Link></li>
            <li><Link to="/home/laptop" className='link-to-normal'>Laptop</Link></li>
            <li><Link to="/home/accessories" className='link-to-normal'>Accessories</Link></li>
          </ul>
        </li>
      </ul> */}

    </div>
     <div className='flex justify-center'>
    <SearchBar onSearch={onSearch}/>
    </div>
    </div>
    {isOverlayOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={toggleOverlay}>
          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()} 
          >
            <LogIn /> 
          </div>
        </div>
      )}

    </div>

 
  );
}

export default Header;

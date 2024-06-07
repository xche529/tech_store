import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import {  useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faStore, faHeart} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/authContext';
import { SearchBar } from './SearchBar';


function Header() {
  const navigate = useNavigate();

  const { user, userDetail } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Use state to track dropdown open state

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // Toggle dropdown state
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
      {/* <div>
        <Link to="/" className='link'>        
        <img className="w-52" src={logo} alt="logo-picture" />
        </Link>
      </div> */}

      <div className="icon">
       {user ? (<Link to="/profile" className='link-to-normal'>
        {userDetail ? (userDetail.avatar ? (
          <img src={userDetail.avatar} alt="Avatar" className="avatar" />
        ) : (user.email)) : (user.email)}
      </Link>) : (<Link to="/login" className='link-to-normal'>
      <button class="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
        Account  <Link to="/items">
        <FontAwesomeIcon icon={faUser}/>
        </Link>
      </button>
      </Link>
      )} 
      <button class="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
        About <FontAwesomeIcon icon={faStore} />
       </button>
       </div>

    <div className='mr-5'>
       <button class="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
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

    </div>

 
  );
}

export default Header;

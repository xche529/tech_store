import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faStore,
  faHeart,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/authContext";
import { SearchBar } from "./SearchBar";
import LogIn from "./account/LogIn";
import Cart from "./shoppingCart/Cart";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, userDetail } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoginOverlayOpen, setLoginOverlayOpen] = useState(false);
  const [isCartOverlayOpen, setCartOverlayOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // Toggle dropdown state
  };

  const toggleLoginOverlay = () => {
    setLoginOverlayOpen(!isLoginOverlayOpen); // Toggle overlay state
  };

  const setCartOpen = () => {
    setCartOverlayOpen(true);
  };

  const setCartClose = () => {
    setCartOverlayOpen(false);
  };

  const onSearch = (string) => {
    if (typeof string === "string") {
      navigate("/home/" + string);
    }
  };

  return (
    <div className="flex flex-col justify-cneter item-center mb-4">
      <div>
        <div className="my-10 flex justify-between">
          <div className="ml-20">
            <Link to="/">
              <h1 className="font-bold text-5xl">KIWITECH</h1>
            </Link>
          </div>

          <div className="space-x-4">
            {/* {user ? (<Link to="/profile" className='link-to-normal'>
        {userDetail ? (userDetail.avatar ? (
          <img src={userDetail.avatar} alt="Avatar" className="avatar" />
        ) : (user.email)) : (user.email)}
      </Link>) : (<Link to="/login" className='link-to-normal'> */}
            <button
              onClick={toggleLoginOverlay}
              class="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            >
              Account{" "}
              <Link to="/items">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </button>
            <Link to="/admin">
              <button class="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
                Admin
              </button>
            </Link>
            <button class="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
              About <FontAwesomeIcon icon={faStore} />
            </button>
          </div>

          <div className="mr-20 space-x-4">
            <button class="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
              Watchlist{" "}
              <Link to="/cart">
                <FontAwesomeIcon icon={faHeart} />
              </Link>
            </button>

            <button
              onClick={setCartOpen}
              class="px-3 py-3 bg-black text-white font-bold rounded-2xl transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faCartShopping} size="2x" />
              $0.00
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          {location.pathname !== "/admin" && <SearchBar onSearch={onSearch} />}
        </div>
      </div>
      {isLoginOverlayOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
          onClick={toggleLoginOverlay}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <LogIn />
          </div>
        </div>
      )}
      {isCartOverlayOpen && <Cart closeCart={setCartClose} />}
    </div>
  );
}

export default Header;

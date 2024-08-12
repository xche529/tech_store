import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStore, faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAuth} from "../context/authContext";
import { SearchBar } from "./SearchBar";
import LogIn from "./account/LogIn";
import Cart from "./shoppingCart/Cart";
import About from "./AboutModal";
import { useCart } from '../context/cartContext';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

function Header() {
const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const {cartItems} = useCart();
  const { logout } = useAuth();



  const [totalPrice, setTotalPrice] = useState(0); // State to hold total price
  const { user, login } = useAuth();
  const [isLoginOverlayOpen, setLoginOverlayOpen] = useState(false);
  const [isCartOverlayOpen, setCartOverlayOpen] = useState(false);
  const [isAboutOverlayOpen, setAboutOverlayOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      cartItems.forEach(item => {
        total += item.price * item.quantity;
      });
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cartItems]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserEmail(currentUser.email);
        login(currentUser);
      } else {
        setUserEmail('');
      }
    });
    return () => unsubscribe();
  }, [auth, login]);

  const setLoginClose = () => {
    setLoginOverlayOpen(false);
  };

  const toggleLoginOverlay = () => {
    setLoginOverlayOpen(!isLoginOverlayOpen);
  };

const setAboutOpen = () => {
    setAboutOverlayOpen(true);
    }

 const setAboutClose = () => {
    setAboutOverlayOpen(false);
    }


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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
     logout();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };
  return (
    <div className="flex flex-col item-center mb-4">
      <div>
        <div className="my-10 flex justify-between">
          <div className="ml-10">
            <Link to="/">
              <h1 className="font-bold text-5xl">KIWITECH</h1>
            </Link>
          </div>

          <div className="flex space-x-4">
          {userEmail ? (
              <div className="flex items-center">     
                <button
                  onClick={handleSignOut}
                  className="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                >
                <span className="text-green-400 font-bold">
                  Welcome, {userEmail.slice(0,5)}!  
                </span>
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={toggleLoginOverlay}
                className="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
              >
                Account <FontAwesomeIcon icon={faUser} />
              </button>
            )}
            <Link to="/admin">
              <button className="hidden sm:block px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
                Admin
              </button>
            </Link>
            <button onClick={setAboutOpen} className="hidden md:block px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
              About <FontAwesomeIcon icon={faStore} />
            </button>
          </div>

          <div className="mr-20 space-x-4">

            <button
              onClick={setCartOpen}
              class="px-3 py-3 bg-black text-white font-bold rounded-2xl transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
             >
              <FontAwesomeIcon icon={faCartShopping} size="2x" />
              ${totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          {location.pathname !== "/admin" && <SearchBar onSearch={onSearch} />}
        </div>
      </div>
      {isLoginOverlayOpen && (
            <LogIn closeLogin={setLoginClose}/>
      )}
      {isCartOverlayOpen && <Cart closeCart={setCartClose} userDetail={user}/>}
      {isAboutOverlayOpen && <About closeAbout={setAboutClose} />}
    </div>
  );
}

export default Header;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useCart } from '../../context/cartContext';
import { getCart, checkAdmin as checkAdminApi } from '../../api';

function LogIn({ closeLogin }) {
  const provider = new GoogleAuthProvider();
  const { updateCartItem } = useCart();
  const { login, isAdmin } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleFetchCart = async (userEmail) => {
    try {
      const products = await getCart(userEmail);
      const updatedItems = products.map((product) => ({
        ...product,
        quantity: product.quantity,
      }));
      updateCartItem(updatedItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleToggleAdminLogin = () => {
    setIsAdminLogin(!isAdminLogin);
    setIsSignUp(false);
  };

  const checkAdmin = async (email, password) => {
    try {
      const response = await checkAdminApi(email, password);
      
      if (response && response.isAdmin) {
        console.log("Admin access granted.");
        return true; 
      } else {
        console.log("Admin access denied.");
        setError('Invalid admin credentials');
        return false;
      }
    } catch (error) {
      console.error('Error checking admin:', error);
      setError('Error checking admin credentials');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      let userCredential;
      let adminStatus = false;
  
      if (isAdminLogin) {
        const isAdminValid = await checkAdmin(email, password);
        if (isAdminValid) {
          adminStatus = true;
        } else {
          setError('Invalid admin credentials');
          return; 
        }
      }
  
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
  
      console.log("admin" + adminStatus);

      await login(userCredential.user, adminStatus);
  
      await handleFetchCart(email);
      closeLogin();
  
      if (adminStatus) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error.code, error.message);
      setError(error.message);
    }
  };
  
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      await login(result.user, false);
      closeLogin();
      
      if (isAdmin && isAdminLogin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error.code, error.message);
      setError(error.message);
    }
  };
  
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={closeLogin}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-2xl font-bold mb-4">
          {isAdminLogin ? 'Admin Log In' : isSignUp ? 'Sign Up' : 'Log In'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={handleEmailChange} 
              className="mt-1 p-2 w-full border rounded-md" 
              required 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={handlePasswordChange} 
              className="mt-1 p-2 w-full border rounded-md" 
              required 
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button type="submit" className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-semibold transisiton ease-in-out duration-150 rounded-md hover:scale-105">
            {isSignUp ? 'Sign Up' : isAdminLogin ? 'Admin Log In' : 'Log In'}
          </button>
        </form>

        {!isAdminLogin && (
          <>
            <button 
              onClick={handleToggleSignUp} 
              className="rounded-md mt-4 w-full py-2 px-4 bg-red-500 text-white font-semibold hover:bg-red-600"
            >
              {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </button>
            
            <button 
              onClick={handleGoogleSignIn} 
              className="rounded-md mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold hover:bg-blue-700 flex items-center justify-center"
            >
              Log In with 
              <FontAwesomeIcon icon={faGoogle} className="ml-2" />
            </button>
          </>
        )}
        <button 
          onClick={handleToggleAdminLogin} 
          className={`rounded-md mt-4 w-full py-2 px-4 ${isAdminLogin ? 'bg-yellow-600' : 'bg-yellow-500'} text-white font-semibold hover:bg-yellow-600`}
        >
          {isAdminLogin ? 'Switch to User Log In' : 'Admin Log In'}
        </button>
      </div>
    </div>
  );
}

export default LogIn;

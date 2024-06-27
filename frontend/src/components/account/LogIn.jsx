import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function LogIn({ closeLogin }) {
  const provider = new GoogleAuthProvider();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
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

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      login(userCredential.user);
      closeLogin();
      navigate('/');
    } catch (error) {
      console.error(error.code, error.message);
        setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      login(result.user);
      closeLogin(); // Close the overlay on successful Google login
      navigate('/');
    } catch (error) {
      console.error(error.code, error.message);
        setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={closeLogin}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-2xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Log In'}</h1>
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
          <button type="submit" className="w-full py-2 px-4 bg-black text-white font-semibold hover:bg-blue-700">{isSignUp ? 'Sign Up' : 'Log In'}</button>
        </form>
        <button 
          onClick={handleToggleSignUp} 
          className="mt-4 w-full py-2 px-4 bg-red-500 text-white font-semibold  hover:bg-red-600"
        >
          {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </button>
        
        <button 
      onClick={handleGoogleSignIn} 
      className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold hover:bg-blue-700 flex items-center justify-center"
    >
      Log In with 
      <FontAwesomeIcon icon={faGoogle} className="ml-2" />
    </button>
      </div>
    </div>
  );
}

export default LogIn; 

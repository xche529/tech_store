import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/signUp.css';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../../context/authContext';

function LogIn() {
  const provider = new GoogleAuthProvider();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to track if it's signup mode or not
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp); // Toggle between login and signup modes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    
    if (isSignUp) {
      // If in signup mode, create a new user
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          login(userCredential.user);
          navigate('/');
        })
        .catch((error) => {
          console.error(error.code, error.message);
        });
    } else {
      // Otherwise, log in the user
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          login(userCredential.user);
          navigate('/');
        })
        .catch((error) => {
          console.error(error.code, error.message);
        });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
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
          <button type="submit" className="w-full py-2 px-4 bg-black text-white font-semibold hover:bg-blue-700">{isSignUp ? 'Sign Up' : 'Log In'}</button>
        </form>
        <button 
          onClick={handleToggleSignUp} 
          className="mt-4 w-full py-2 px-4 bg-red-500 text-white font-semibold  hover:bg-red-600"
        >
          {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </button>
        <button>
            <button 
                onClick={() => signInWithPopup(getAuth(), provider)
                .then((result) => {
                    login(result.user);
                    navigate('/');
                })
                .catch((error) => {
                    console.error(error.code, error.message);
                })} 
                className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold hover:bg-blue-700"
            >
                Log In with Google
            </button>
        </button>
      </div>

    </div>
  );
}

export default LogIn;

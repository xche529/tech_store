import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from '../../context/authContext';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LogIn() {
  const provider = new GoogleAuthProvider();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        login(userCredential.user);
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      login(user);
      console.log(user);
    }).catch((error) => {
      console.error(error.code, error.message);
    });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Log In</h1>
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
          <button type="submit" className="w-full py-2 px-4 bg-black text-white font-semibold hover:bg-blue-700">Log In</button>
        </form>
        <button 
          onClick={handleGoogleSignIn} 
          className="mt-4 w-full py-2 px-4 bg-red-500 text-white font-semibold  hover:bg-red-600"
        >
            
          Sign in with Google
        </button>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;



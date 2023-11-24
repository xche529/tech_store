import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/logIn.css';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update email state
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update password state
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing page
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  };

  return (
    <div className="login">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        <br />
        <button type="submit">Log In</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default LogIn;
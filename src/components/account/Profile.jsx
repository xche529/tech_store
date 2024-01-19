import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from '../.././context/authContext';



function Profile() {
    const { logout } = useAuth();

    function signOut () {
        const auth = getAuth();
        auth.signOut().then(() => {
            logout();
            console.log('Sign-out successful.')
        }).catch((error) => {
            console.log('An error happened.')
        });
    }

  return (
    <div>
        <h1>Profile</h1>
        <p>Profile page</p>
        <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

export default Profile;
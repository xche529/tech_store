import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../.././context/authContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs, getDoc, doc, updateDoc, increment, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';



function Profile() {
    const { user } = useAuth();
    const { logout } = useAuth();
    const storage = getStorage();
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const handleAvatarChange = (event) => {
        setSelectedAvatar(event.target.files[0]);
      };
    
    function signOut () {
        const auth = getAuth();
        auth.signOut().then(() => {
            logout();
            console.log('Sign-out successful.')
        }).catch((error) => {
            console.log('An error happened.')
        });
    }

    function upLoadAvatar () {
    //    const avatarRef = doc(db, 'users', user.email, 'avatar');
        stoageRef = ref(storage, `users/${user.email}/avatar`);
        uploadBytes


    }

  return (
    <div>
        <h1>Profile</h1>
        <p>Profile page</p>
        <button onClick={() => signOut()}>Sign Out</button>
        <br/>
        <p>Upload a Avatar</p>
        <input type="file"  onChange={handleAvatarChange}/>
        {selectedAvatar&&<button onClick={() => upLoadAvatar()}>Upload</button>}

    </div>
  );
}

export default Profile;
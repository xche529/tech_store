import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../.././context/authContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs, getDoc, doc, updateDoc, increment, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';



function Profile() {
  const { user } = useAuth();
  const { logout } = useAuth();
  const storage = getStorage();
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarChange = (event) => {
    setSelectedAvatar(event.target.files[0]);
  };

  function signOut() {
    const auth = getAuth();
    auth.signOut().then(() => {
      logout();
      console.log('Sign-out successful.')
    }).catch((error) => {
      console.log('An error happened.')
    });
  }

  async function upLoadAvatar() {
    const storageRef = ref(storage, `users/avatar` + selectedAvatar.name + `-${Date.now()}`);
    try {
      await uploadBytes(storageRef, selectedAvatar);
      console.log('upload success');
      const downloadURL = await getDownloadURL(storageRef);
      console.log('File available at', downloadURL);
      const avatarRef = doc(db, 'users', user.email);
      await setDoc(avatarRef, {
        avatar: downloadURL
      });

    } catch (error) {
      console.error('error:', error);
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Profile page</p>
      <button onClick={() => signOut()}>Sign Out</button>
      <br />
      <p>Upload a Avatar</p>
      <input type="file" accept="image/*" onChange={handleAvatarChange} />
      {selectedAvatar && <button onClick={() => upLoadAvatar()}>Upload</button>}

    </div>
  );
}

export default Profile;
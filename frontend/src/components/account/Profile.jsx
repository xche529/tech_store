// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../.././context/authContext';
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { collection, getDocs, getDoc, doc, updateDoc, increment, deleteDoc, setDoc } from 'firebase/firestore';
// // import { db } from '../../firebase-config';
// import '../../css/profile.css';
// import Notification from '../Notification';



// function Profile() {
//   const { user, logout, reloadUserDetail } = useAuth();
//   const { } = useAuth();
//   const storage = getStorage();
//   const [selectedAvatar, setSelectedAvatar] = useState(null);
//   const [isNotification, setNotification] = useState(null);

//   const handleAvatarChange = (event) => {
//     setSelectedAvatar(event.target.files[0]);
//   };

//   function signOut() {
//     const auth = getAuth();
//     auth.signOut().then(() => {
//       logout();
//       console.log('Sign-out successful.')
//     }).catch((error) => {
//       console.log('An error happened.')
//     });
//   }

//   async function upLoadAvatar() {
//     const storageRef = ref(storage, `users/avatar` + selectedAvatar.name + `-${Date.now()}`);
//     try {
//       await uploadBytes(storageRef, selectedAvatar);
//       console.log('upload success');
//       const downloadURL = await getDownloadURL(storageRef);
//       console.log('File available at', downloadURL);
//       const avatarRef = doc(db, 'users', user.email);
//       const avatarDoc = await getDoc(avatarRef, 'quantity');
//       if (!avatarDoc.exists()) {
//         await setDoc(avatarRef, {
//           avatar: downloadURL
//         });
//         reloadUserDetail();
//       } else {
//         await updateDoc(avatarRef, {
//           avatar: downloadURL
//         });
//         reloadUserDetail();
//       }
//     } catch (error) {
//       console.error('error:', error);
//     }
//   }

//   function showNotification() {
//     setNotification(true);
//     setTimeout(() => {
//       setNotification(false);
//     }, 1500);
//   }
  

//   // used to upload user address to database
//   function AddressForm() {
//     const upLoadAddress = async () => {
//       const addressRef = doc(db, 'users', user.email);
//       await updateDoc(addressRef, {
//         address: formData
//       });
//     }

//     const [formData, setFormData] = useState({
//       street: '',
//       city: '',
//       state: '',
//       zip: ''
//     });

//     const handleChange = (event) => {
//       const { name, value } = event.target;
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     };

//     const handleSubmit = (event) => {
//       event.preventDefault();
//       upLoadAddress();
//       reloadUserDetail();
//       console.log('Form data:', formData);
//     };


//     return (
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="street">Street Address:</label>
//         <input
//           type="text"
//           id="street"
//           name="street"
//           value={formData.street}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="city">City:</label>
//         <input
//           type="text"
//           id="city"
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="state">State:</label>
//         <input
//           type="text"
//           id="state"
//           name="state"
//           value={formData.state}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="zip">Zip Code:</label>
//         <input
//           type="text"
//           id="zip"
//           name="zip"
//           value={formData.zip}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Submit</button>
//       </form>
//     );
//   }

//   return (
    
//     <div>

//       <Notification isNotification={isNotification} message='Update Success!' />
//       <h1>Profile</h1>
//       <p>Profile page</p>
//       <p>User: {user ? user.email : 'Not logged in'}</p>
//       <button onClick={() => signOut()}>Sign Out</button>
//       <br />
//       <p>Upload an Avatar</p>
//       <input type="file" accept="image/*" onChange={handleAvatarChange} />
//       {selectedAvatar && <button onClick={() => upLoadAvatar()}>Upload</button>}
//       {AddressForm()}
//       <botton onClick={() => showNotification()}>Show Notification</botton>
//     </div>
//   );
// }
 
// export default Profile;
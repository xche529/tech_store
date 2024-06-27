import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADtL-xpLP05D6NRTFE9UKxrD7pI1BUREk",
    authDomain: "tech-store-68146.firebaseapp.com",
    projectId: "tech-store-68146",
    storageBucket: "tech-store-68146.appspot.com",
    messagingSenderId: "552981338221",
    appId: "1:552981338221:web:d46f4c1cb310cdca298764",
    measurementId: "G-30CC3YCJXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage};
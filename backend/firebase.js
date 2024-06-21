import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import config from './config.js';

const firebaseConfig = {
    apiKey: "AIzaSyADtL-xpLP05D6NRTFE9UKxrD7pI1BUREk",
    authDomain: "tech-store-68146.firebaseapp.com",
    projectId: "tech-store-68146",
    storageBucket: "tech-store-68146.appspot.com",
    messagingSenderId: "552981338221",
    appId: "1:552981338221:web:d46f4c1cb310cdca298764",
    measurementId: "G-30CC3YCJXN"
  };
  

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, storage }; 
export default firebaseApp; 

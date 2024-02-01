import { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, getDoc, doc, updateDoc, increment, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUserDetail = localStorage.getItem('userDetail');
    let tempUser = null;
    if (storedUser) {
      tempUser = JSON.parse(storedUser)
      if(storedUserDetail != undefined){
        console.log("storedUserDetail:", storedUserDetail)
        tempUser.avatar = (storedUserDetail)
      }
      setUser(tempUser);
    }
    console.log("Read User:", tempUser)  
  }, []);

  async function login(userData){
    try{
      const userDetailRef = collection(db, 'users')
      const userDetailDoc = doc(userDetailRef, userData.email)
      console.log("avatarDoc:", userDetailDoc)
      const userDetail = await getDoc(userDetailDoc)
      if(userDetail.exists()){
        userData.avatar = userDetail.data().avatar
        console.log("avatar:", userData.avatar)
        localStorage.setItem('userDetail', userData.avatar);
      }
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }catch(err){
      console.log(err)
    }
  };

  const showResult = () => {
    console.log(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
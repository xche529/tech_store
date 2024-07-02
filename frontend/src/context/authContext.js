import { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, getDoc, doc, updateDoc, increment, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUserDetail = localStorage.getItem('userDetail');
    let tempUser = null;
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      if (storedUserDetail) {
        setUserDetail(JSON.parse(storedUserDetail))
        console.log("Read User Success")
      }
    }
  }, []);

  //store user data and get user detail from db
  async function login(userData) {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
    //   reloadUserDetail()
      setUser(userData);
    } catch (err) {
      console.log(err)
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

//   //update local storage of userDetail
//   const reloadUserDetail = async () => {
//     localStorage.removeItem('userDetail');
//     setUserDetail(null);
//     const userData = JSON.parse(localStorage.getItem('user'));
//     try {
//       const userDetailRef = collection(db, 'users')
//       const userDetailDoc = doc(userDetailRef, userData.email)
//       const userDetail = await getDoc(userDetailDoc)
//       if (userDetail.exists()) {
//         setUserDetail(userDetail.data());
//         localStorage.setItem('userDetail', JSON.stringify(userDetail.data()));
//         console.log("User detail refreshed:", userDetail.data())
//       }
//     } catch {

//     }
//   }

  return (
    <AuthContext.Provider value={{ user, userDetail, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
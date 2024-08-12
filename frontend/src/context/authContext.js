import { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUserDetail = localStorage.getItem('userDetail');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (storedUserDetail) {
        setUserDetail(JSON.parse(storedUserDetail));
      }
      checkAdminRole(parsedUser.email);
    }
  }, []);


  const checkAdminRole = async (email) => {
    try {
      const userDetailRef = doc(db, 'users', email);
      const userDetailDoc = await getDoc(userDetailRef);
      if (userDetailDoc.exists()) {
        const data = userDetailDoc.data();
        setIsAdmin(data.role === 'admin');
      }
    } catch (err) {
      console.log('Error checking admin role:', err);
    }
  };

  async function login(userData) {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      checkAdminRole(userData.email);
    } catch (err) {
      console.log(err);
    }
  }

  // Logout function
  const logout = () => {
    setUser(null);
    setUserDetail(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('userDetail');
  };

  return (
    <AuthContext.Provider value={{ user, userDetail, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

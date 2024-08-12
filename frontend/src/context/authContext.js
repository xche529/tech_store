import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUserDetail = localStorage.getItem('userDetail');

    if (storedUser) {
      setUser(JSON.parse(storedUser))
      if (storedUserDetail) {
        setUserDetail(JSON.parse(storedUserDetail))
        console.log("Read User Success")
      }
    }
  }, []);
  

  async function login(userData, isadmin) {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      if (!admin) {
        localStorage.setItem('admin', JSON.stringify(isadmin));
        setAdmin(isadmin);
      }
    console.log("Login Success" + admin)
    } catch (err) {
      console.log(err)
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, userDetail,admin,login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

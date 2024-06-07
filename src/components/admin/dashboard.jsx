import React, { useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect } from 'react';
import AdminProductList from './ProductList'

const AdminDashboard = () => {

  const [users, setUsers] = useState([]);
  const usersRef = collection(db, "users");

  useEffect(() => {
      const getUsers = async () => {
          const data = await getDocs(usersRef);
          setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getUsers();
  }, []);


  return (
    <div className="font-montserrat">
        <div>
           <AdminProductList />
        </div>
        
    </div>
  );
};



export default AdminDashboard;



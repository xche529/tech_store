// AdminDashboard.jsx
import React, { useState } from 'react';
import '../../css/admin.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect } from 'react';
import AdminProductList from './ProductList'
import { Link } from 'react-router-dom';

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


  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <div className="tabs">
          <div
            className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleTabChange('dashboard')}
          >
            Dashboard
          </div>
        <div
          className={`tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => handleTabChange('products')}
        >
            Products
        </div>
          <div
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => handleTabChange('orders')}
          >
            Orders
          </div>
        </div>
      </div>
      <div className="main-content">
        <h1 className='title'>Product List</h1>
        <div className="tab-content">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'products' && <AdminProductList />}
          {activeTab === 'orders' && <OrdersContent />}
        </div>
      </div>
    </div>
  );
};

const DashboardContent = () =>  <div>Dashboard Content Goes Here</div>;
const OrdersContent = () => <div>Orders Content Goes Here</div>;



export default AdminDashboard;



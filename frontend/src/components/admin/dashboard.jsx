import React from 'react';
import AdminProductList from './ProductList'
import { useAuth } from '../../context/authContext';

const AdminDashboard = () => {

    const { admin } = useAuth();

if (!admin) {
    console.log("dashboard admin", admin)
    return <div className='flex items-center justify-center'>
    <h1 className='text-xl font-bold'>Not Authorized to view this page</h1>
    </div>
  }

    return (
    <div>
           <AdminProductList />
    </div>
  );
};



export default AdminDashboard;



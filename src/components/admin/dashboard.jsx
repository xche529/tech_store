// AdminDashboard.jsx
import React, { useState } from 'react';
import '../admin.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="main-content">
        <h1>Admin Dashboard</h1>
        <div className="tab-content">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'products' && <ProductsContent />}
          {activeTab === 'orders' && <OrdersContent />}
        </div>
      </div>
    </div>
  );
};

const DashboardContent = () => <div>Dashboard Content Goes Here</div>;
const ProductsContent = () => <div>Products Content Goes Here</div>;
const OrdersContent = () => <div>Orders Content Goes Here</div>;

export default AdminDashboard;

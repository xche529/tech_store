import React, { useRef } from 'react';
import './index.css';
import './css/cart.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs } from '@firebase/firestore'
import './css/homePage.css';
import CartPage from './components/checkout/CartPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import ItemDetails from './components/admin/dashboard';
import Header from './components/Header';
import ShowHeader from './components/ShowHeader';
import HomePage from './components/HomePage';
import Item from './components/Item';

function App() {
  return (
    <div>
      <div className="wrapper">

        <Router>
          <ShowHeader>
            <Header />
          </ShowHeader>
          <Routes>
          <Route path="/*" element={<Navigate to="/home" />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/items" element={<ItemDetails />} />
            <Route path="/item" element={<Item />} />
            <Route path="/home" element={<HomePage />} />
            
          </Routes>

        </Router>
      </div>

      
    </div>
  );
}

export default App;




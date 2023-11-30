import React, { useRef } from 'react';
import './index.css';
import './css/cart.css';
import { withRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import { collection, getDocs } from '@firebase/firestore'
import './css/homePage.css';
import CartPage from './components/checkout/CartPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import ItemDetails from './components/admin/dashboard';
import Header from './components/Header';
import ShowHeader from './components/ShowHeader';
import HomePage from './components/HomePage';

function App() {

  const childRef = useRef();
  const [isMainPage, setIsMainPage] = useState(true);

  const hideMainPage = () => {
    childRef.current.hide();
    setIsMainPage(false);
  };

  const showMainPage = () => {
    childRef.current.show();
    setIsMainPage(true);
  };

  return (
    <div>
      <div className="wrapper">

        <Router>
          <ShowHeader>
            <Header />
          </ShowHeader>
          <Routes>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/items" element={<ItemDetails />} />
          </Routes>
        </Router>
      </div>

        <HomePage />
      
    </div>
  );
}

export default App;




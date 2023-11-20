import React, { useState, useRef} from 'react';
import './index.css';
import './css/cart.css';
import './css/homePage.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CartPage from './components/checkout/CartPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import ItemDetails from './components/Item';
import Header from './components/Header';
import HomePage from './components/HomePage';

function App() {

  const childRef = useRef();


  
  const hideMainPage = () => {
    childRef.current.hide();
  };

  const ShowMainPage = () => {
    childRef.current.show();
  }
  return (
    <div>
      <div className="wrapper">

        <Router>
          <Header />
          <Routes>
            <Route path="/cart" element={<CartPage />}  />
            <Route path="/checkout" element={<CheckoutPage hideMainPage={homePageRef.current.hide} />} />
            <Route path="/items" element={<ItemDetails />} />
          </Routes>
        </Router>
      </div>

      <HomePage />
    </div>
  );
}

export default App;

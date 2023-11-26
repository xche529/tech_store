import React from 'react';
import './index.css';
import './css/cart.css';
import { withRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState, useEffect } from 'react';
import { collection , getDocs } from '@firebase/firestore';
import CartPage from './components/checkout/CartPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import ItemDetails from './components/admin/dashboard';
import Header from './components/Header';
import ShowHeader from './components/ShowHeader';

function App() {
  return (
    <div class="wrapper">
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
  );
}

export default App;




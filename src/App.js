import React from 'react';
import './index.css';
import './css/cart.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CartPage from './components/checkout/CartPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import ItemDetails from './components/Item';
import Header from './components/Header';
import LogIn from './components/account/LogIn';
import SignUp from './components/account/SignUp';

function App() {
  return (
    <div class="wrapper">

      <Router>
        <Header />
        <Routes>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/items" element={<ItemDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

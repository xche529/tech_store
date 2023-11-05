import React from 'react';
import './index.css';
import './css/cart.css';
import meme from './images/meme.jpg';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CartPage from './components/checkout/CartPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import ItemDetails from './components/Item'

function MainPage() {

  return (
    <div className="main-page">
      <div className="text-with-image">
        <p className="text" style={{ fontSize: '24px' }}>
          欢迎来到UOA线上超商
        </p>
        <img className="image" src={meme} alt="Image Alt Text" />
      </div>
      <br />
      <Link to="/cart">购物车</Link>
      <Link to="/items">商品</Link>
      <Link to="/checkout">结算</Link>
      <Link to="/">主页</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
				<Route path="/items" element={<ItemDetails />} />
      </Routes>
    </Router>
  );
}

export default App;


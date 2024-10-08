import React from "react";
import "./index.css";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./css/homePage.css";
import ItemDetails from "./components/admin/dashboard";
import Header from "./components/Header";
import LogIn from "./components/account/LogIn";
import SignUp from "./components/account/SignUp";
import HomePage from "./components/HomePage";
import Item from "./components/Item";
import Admin from "./components/admin/dashboard";
import { AuthProvider } from "./context/authContext";
import { CartProvider } from './context/cartContext';
import "firebase/auth";

function App() {
  return (
    <div>
      <div className="wrapper">
        <AuthProvider>
          <CartProvider>
            <Router>
              <Header />
              <Routes>
                <Route path="/*" element={<Navigate to="/home/homepage" />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/items" element={<ItemDetails />} />
                <Route path="/home/:keyWordString" element={<HomePage />} />
                <Route path="/item/:itemId" element={<Item />} />
                <Route path="/admin" element={
                    <Admin />
                } />
                </Routes>
            </Router>
          </CartProvider>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;

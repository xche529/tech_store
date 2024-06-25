import React from 'react';
import './index.css';
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './css/homePage.css';
import ItemDetails from './components/admin/dashboard';
import Header from './components/Header';
import Profile from './components/account/Profile';
import LogIn from './components/account/LogIn';
import SignUp from './components/account/SignUp';
import ShowHeader from './components/ShowHeader';
import HomePage from './components/HomePage';
import Item from './components/Item';
import Admin from './components/admin/dashboard';
import Footer from './components/Footer';
import { AuthProvider } from './context/authContext';
import 'firebase/auth';



function App() {
  return (
    <div>
      <div className="wrapper">
        <AuthProvider>
          <Router>
            <ShowHeader>
              <Header />
            </ShowHeader>
            <Routes>
              <Route path="/*" element={<Navigate to="/home/homepage" />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/items" element={<ItemDetails />} />
              <Route path="/home/:keyWordString" element={<HomePage />} />
              <Route path="/item/:itemId" element={<Item />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
            <Footer/>
          </Router>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;




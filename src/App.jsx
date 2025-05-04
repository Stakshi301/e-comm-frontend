import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Signup from './pages/Auth/Signup'
import ProductPage from './pages/ProductPage';
import CartPage from './features/CartPage';
import WishlistPage from './features/WishlistPage';
import { isTokenExpired } from './utils/token';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/loginForm'); // Make sure this matches your actual login route
    }
  }, []);
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginForm" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/wishlistPage" element={<WishlistPage />} />
      </Routes>
    </div>
  );
}

export default App;
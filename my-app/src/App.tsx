import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './output.css';
import AuthPage from './pages/authpage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default App;

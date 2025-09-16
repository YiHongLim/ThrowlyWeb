import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './output.css';
import AuthPage from './pages/authpage';
import GoogleSignIn from './pages/GoogleSignIn';
import AppleSignIn from './pages/AppleSignIn';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/signin/google" element={<GoogleSignIn />} />
      <Route path="/signin/apple" element={<AppleSignIn />} />
    </Routes>
  );
}

export default App;

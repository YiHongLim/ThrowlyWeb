import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/authpage';
import EmailSignIn from './pages/EmailSignIn';
import GoogleSignIn from './pages/GoogleSignIn';
import AppleSignIn from './pages/AppleSignIn';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/signin/email" element={<EmailSignIn />} />
      <Route path="/signin/google" element={<GoogleSignIn />} />
      <Route path="/signin/apple" element={<AppleSignIn />} />
    </Routes>
  );
}

export default App;

import React from 'react';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// @ts-ignore
import logo from './logo.svg';
import './App.css';
import CampaignPage from './pages/Go_Furnish_Me/CampaignPage';
import GoFurnishMePage from "./pages/Go_Furnish_Me/GoFurnishMePage";
import CampaignPageDetails from "./pages/Go_Furnish_Me/CampaignPageDetails";
import Home from './pages/Home/Home';
import AuthPage from './pages/authpage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/go-furnish-me" element={<GoFurnishMePage />} />
            <Route path="/campaign-page-details" element={<CampaignPageDetails />} />
            <Route path="/campaign-page" element={<CampaignPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/cart" element={<CartPage />} />
        </Routes>
    </Router>

  );
}

export default App;

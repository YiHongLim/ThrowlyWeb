import React from 'react';

import { Routes, Route } from "react-router-dom";
import { ProductListing } from "./pages/Listings/ProductListing";
import { ProductDetail } from "./pages/ProductDetail";
import './output.css';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/go-furnish-me" element={<GoFurnishMePage />} />
        <Route path="/campaign-page-details" element={<CampaignPageDetails />} />
        <Route path="/campaign-page" element={<CampaignPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/listing" element={<ProductListing />} />
        <Route path="/listing/:id" element={<ProductDetail />} />
            </Routes>

  );
}

export default App;


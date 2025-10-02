import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProductListing } from './pages/Listings/ProductListing';
import { ProductDetail } from './components/listing/ProductDetail';
import AuthPage from './pages/authpage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import CampaignPage from './pages/Go_Furnish_Me/CampaignPage';
import CampaignPageDetails from './pages/Go_Furnish_Me/CampaignPageDetails';
import GoFurnishMePage from './pages/Go_Furnish_Me/GoFurnishMePage';
import  Home  from './pages/Home/Home';
import RootLayout from './components/RootLayout';
import AboutUs from './pages/Home/About_us';
import './output.css';
import FAQ from './pages/Home/FAQ';
import DonateNowForm from "./components/go_furnish_me/DonateNowForm";

function App() {
    return (
        <RootLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                
                <Route path="/go-furnish-me" element={<GoFurnishMePage />} />
                <Route path="/campaign-page-details/:id" element={<CampaignPageDetails />} />
                <Route path="/campaign-page" element={<CampaignPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/listings" element={<ProductListing />} />
                <Route path="/listings/:id" element={<ProductDetail />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/FAQ" element={<FAQ />} />
            </Routes>
        </RootLayout>
    );
}

export default App;

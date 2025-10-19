import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProductListing } from './pages/Listings/ProductListing';
import { ProductDetail } from './components/listing/ProductDetail';
import AuthPage from './pages/authpage';
import SignUpPage from './pages/SignUpPage';
import CampaignPage from './pages/Go_Furnish_Me/CampaignPage';
import CampaignDetailsPage from './pages/Go_Furnish_Me/CampaignDetailsPage';
import GoFurnishMePage from './pages/Go_Furnish_Me/GoFurnishMePage';
import  Home  from './pages/Home/Home';
import AdminPage from './pages/AdminPage';
import RootLayout from './components/RootLayout';
import AboutUs from './pages/Home/About_us';
import './output.css';
import DonationListPage from "./pages/Go_Furnish_Me/DonationListPage";
import FAQ from './pages/Home/FAQ';
import EstimateListingPage from "./pages/Go_Furnish_Me/EstimateListingPage";
import Categories from './pages/Categories/Category';

function App() {
    return (
        <RootLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/go-furnish-me" element={<GoFurnishMePage />} />
                <Route path="/campaign-page" element={<CampaignPage />} />
                <Route path="/campaign-donation-list-page/:id" element={<DonationListPage />} />
                <Route path="/campaign-page-details/:id" element={<CampaignDetailsPage />} />
                <Route path="/estimate-listing" element={<EstimateListingPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/listings" element={<ProductListing />} />
                <Route path="/listings/:id" element={<ProductDetail />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/FAQ" element={<FAQ />} />
            </Routes>
        </RootLayout>
    );
}

export default App;

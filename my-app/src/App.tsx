import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// @ts-ignore
import logo from './logo.svg';
import './App.css';
import CampaignPage from './pages/Go_Furnish_Me/CampaignPage';
import GoFurnishMePage from "./pages/Go_Furnish_Me/GoFurnishMePage";
import CampaignPageDetails from "./pages/Go_Furnish_Me/CampaignPageDetails";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<CampaignPage />} />
            <Route path="/go-furnish-me" element={<GoFurnishMePage />} />
            <Route path="/campaign-page-details" element={<CampaignPageDetails />} />
        </Routes>
    </Router>
  );

}

export default App;

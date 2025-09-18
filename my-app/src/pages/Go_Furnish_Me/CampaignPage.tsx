import React from 'react';
import CampaignHero from '../../components/CampaignHero';
import CampaignCardsGrid from "../../components/CampaignCardsGrid";
import {useNavigate} from "react-router";
import {Divider} from "antd";


function CampaignPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 p-8">
                <CampaignHero
                    title="Find your perfect space"
                    subtitle="Discover, fund, and furnish spaces with ease."
                    ctaText="Start a GoFurnishMe"
                    onCtaClick={() => navigate('/go-furnish-me')}
                    imageUrl="/logo512.png"
                />
                <Divider />
                <CampaignCardsGrid />
            </main>
            <footer className="bg-gray-100 p-4 text-center">
                <p className="text-sm text-gray-600">&copy; Throwly</p>
            </footer>
        </div>
    );
}

export default CampaignPage;

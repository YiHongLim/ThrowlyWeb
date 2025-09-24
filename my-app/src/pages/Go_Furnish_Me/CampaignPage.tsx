import React from 'react';
import CampaignHero from '../../components/go_furnish_me/CampaignHero';
import CampaignCards from "../../components/go_furnish_me/CampaignCards";
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
                <div style={{ margin: "40px 0", width: "100%" }}>
                    <svg viewBox="0 0 1440 100" width="100%" height="100" preserveAspectRatio="none">
                        <path d="M0,30 C360,90 1080,0 1440,60 L1440,100 L0,100 Z" fill="#d44b4f">
                            <animate attributeName="d" values="
        M0,30 C360,90 1080,0 1440,60 L1440,100 L0,100 Z;
        M0,50 C400,0 1040,100 1440,30 L1440,100 L0,100 Z;
        M0,30 C360,90 1080,0 1440,60 L1440,100 L0,100 Z
      " dur="8s" repeatCount="indefinite" />
                        </path>
                    </svg>
                </div>

                <CampaignCards />
            </main>
            <footer className="bg-gray-100 p-4 text-center">
                <p className="text-sm text-gray-600">&copy; Throwly</p>
            </footer>
        </div>
    );
}

export default CampaignPage;

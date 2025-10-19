import React, { useState } from 'react';
import { Button } from 'antd';
import DonateNowForm from "./DonateNowForm";
import {CampaignType} from "../../utils/types";
import {getAuth} from "firebase/auth";
import {useNavigate} from "react-router";


const DonateNowButton: React.FC<{ campaign: CampaignType }> = ({ campaign }) => {
    const [showDonate, setShowDonate] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if(!currentUser) {
            navigate('/login');
            return;
        }
        if (currentUser.uid === campaign.userId) {
            alert("You cannot donate to your own campaign.");
            return;
        }
        setShowDonate(true);
    }
    // Handle successful submit
    const handleDonateSubmit = (values: any) => {
        // TODO: Send values to backend/API here
        setShowDonate(false); // Close modal
    };

    return (
        <>
            <Button
                block
                size="large"
                style={{
                    background: "#d3fdba",
                    border: "none",
                    color: "#137c23",
                    fontWeight: 700,
                }}
                onClick={() => handleOpen()}
            >
                Donate now
            </Button>
            <DonateNowForm
                visible={showDonate}
                onCancel={() => setShowDonate(false)}
                onSubmit={handleDonateSubmit}
                campaignId={campaign.id}
            />
        </>
    );
};

export default DonateNowButton;

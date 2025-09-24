import React, { useState } from 'react';
import { Button } from 'antd';
import DonateNowForm from "./DonateNowForm";

const DonateNowButtonWithModal: React.FC = () => {
    const [showDonate, setShowDonate] = useState(false);

    // Handle successful submit
    const handleDonateSubmit = (values: any) => {
        // TODO: Send values to backend/API here
        console.log('Donation submitted:', values);
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
                onClick={() => setShowDonate(true)}
            >
                Donate now
            </Button>
            <DonateNowForm
                visible={showDonate}
                onCancel={() => setShowDonate(false)}
                onSubmit={handleDonateSubmit}
            />
        </>
    );
};

export default DonateNowButtonWithModal;

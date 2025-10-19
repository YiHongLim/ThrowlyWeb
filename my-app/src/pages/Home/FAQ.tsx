import React from "react";
import { Card, Typography, Collapse, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import blobBackground from "../../assets/images/gofurnishme_images/blob-scene-haikei-1.svg";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const FAQ: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    padding: "0",
  };

  const cardStyle: React.CSSProperties = {
    borderRadius: "20px",
    boxShadow: "0 20px 40px -10px rgba(0,0,0,.08), 0 10px 20px -5px rgba(0,0,0,.04)",
    border: "1px solid rgba(255,255,255,0.2)",
    marginBottom: "40px",
  };

  const faqData = [
    {
      key: "1",
      question: "Can you buy things outright?",
      answer: "Yes. On the Home screen, look in the listings. Items posted with a set price are sold for money. You can text the seller, negotiate if needed, and arrange payment using your agreed method."
    },
    {
      key: "2", 
      question: "How do you post items?",
      answer: "Go to the Add Listing page (center button in the app). Upload images, add a title and description. If you leave price = 0 → it's a free item, AI assigns points. If you set a price → it's sold with money."
    },
    {
      key: "3",
      question: "How do you show interest in an item?",
      answer: "For paid items: Tap the seller's profile on the listing page, then hit Text to message them. For free items: You need enough points. If you do, you can text to arrange pickup. If you also have points for transport, you'll see a Checkout button."
    },
    {
      key: "4",
      question: "How do you transfer points?",
      answer: "After meeting and exchanging the item, open your chat with the seller and swipe up. This triggers the point transfer instantly."
    },
    {
      key: "5",
      question: "How many points do you start with?",
      answer: "Every user starts with $50 in points to begin donating, trading, and building community karma."
    },
    {
      key: "6",
      question: "How does Throwly ensure safety?",
      answer: "Accounts are verified. Most exchanges use points instead of real money. We discourage unsafe in-person meetups and scams."
    },
    {
      key: "7",
      question: "Who wins prizes?",
      answer: "Each month, the top donor (most points per city) wins community prizes."
    },
    {
      key: "8",
      question: "How/What location info is shown?",
      answer: "Item locations only appear if the seller chooses to show them. Any item shown on the map stays visible for 7 days. For free items, showing how close it is helps the item get picked up faster. For paid items, sellers can still opt in for extra visibility, with the understanding of the added exposure. We never show or share your exact personal location. For tweets, we only show approximate distance. If it's under 5 miles, we say 'in town.' On listing screens, we display only how far away the item is—not your address."
    },
    {
      key: "9",
      question: "How does Throwly use my location?",
      answer: "To find nearby items. To calculate transport costs. To show local events, services, and volunteer gigs. To run city-specific leaderboards, prizes, and notifications."
    },
    {
      key: "10",
      question: "How does Throwly use notifications?",
      answer: "To alert you when buyers or sellers send you messages."
    },
    {
      key: "11",
      question: "How do you stop people from gaming the system?",
      answer: "We track device usage and ID verification (e.g., phone, DL in the future)."
    },
    {
      key: "12",
      question: "Why Throwly?",
      answer: "Throwly builds the world's biggest free marketplace—rewarding givers, empowering communities, and removing the pain of scams, no-shows, ghosting, haggling, and unsafe exchanges."
    },
    {
      key: "13",
      question: "Do you get rewards for referrals?",
      answer: "Yes! You earn $10 in points for each friend you refer."
    }
  ];

  return (
    <div style={containerStyle}>
      {/* Hero Banner Section */}
      <div
        style={{
          width: '100%',
          position: 'relative',
          minHeight: 300,
          backgroundImage: `url(${blobBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "80px 24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            minHeight: 300
          }}
        >
          <div style={{ 
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }}>
            <Title level={1} style={{ 
              margin: 0, 
              marginBottom: 16, 
              fontWeight: 800, 
              color: "#ffffff", 
              fontSize: "48px",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }}>
              Frequently Asked Questions
            </Title>
            <Text style={{ 
              fontSize: "1.25rem", 
              color: "#ffffff", 
              maxWidth: "600px", 
              display: "block",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              opacity: 0.95
            }}>
              Everything you need to know about Throwly
            </Text>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>
        <Card style={cardStyle} bodyStyle={{ padding: "60px" }}>
          <Collapse
            expandIcon={({ isActive }) => (
              <PlusOutlined 
                style={{ 
                  color: "#ff6f73", 
                  fontSize: "16px",
                  transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease"
                }} 
              />
            )}
            expandIconPosition="right"
            style={{
              backgroundColor: "transparent",
              border: "none"
            }}
          >
            {faqData.map((faq) => (
              <Panel
                key={faq.key}
                header={
                  <Text style={{ 
                    fontSize: "18px", 
                    fontWeight: "700", 
                    color: "#ff6f73",
                    lineHeight: "1.4"
                  }}>
                    {faq.question}
                  </Text>
                }
                style={{
                  marginBottom: "16px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff"
                }}
                showArrow={true}
              >
                <Text style={{ 
                  fontSize: "16px", 
                  lineHeight: "1.6", 
                  color: "#64748b",
                  display: "block",
                  paddingTop: "8px"
                }}>
                  {faq.answer}
                </Text>
              </Panel>
            ))}
          </Collapse>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;

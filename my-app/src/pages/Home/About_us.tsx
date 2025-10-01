import React from "react";
import { Card, Button, Typography, Row, Col, Avatar, List } from "antd";
import { 
  ThunderboltOutlined, 
  HeartOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  CameraOutlined,
  EnvironmentFilled,
  TeamOutlined,
  ShopOutlined
} from "@ant-design/icons";
import blobBackground from "../../assets/images/gofurnishme_images/blob-scene-haikei-1.svg";

const { Title, Paragraph, Text } = Typography;

const AboutUs: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    padding: "0",
    scrollBehavior: "smooth",
  };

  const cardStyle: React.CSSProperties = {
    borderRadius: "20px",
    boxShadow: "0 20px 40px -10px rgba(0,0,0,.08), 0 10px 20px -5px rgba(0,0,0,.04)",
    border: "1px solid rgba(255,255,255,0.2)",
    marginBottom: "40px",
    transition: "all 0.3s ease",
    transform: "translateY(0)",
  };

  const cardHoverStyle: React.CSSProperties = {
    transform: "translateY(-4px)",
    boxShadow: "0 25px 50px -10px rgba(0,0,0,.12), 0 15px 30px -5px rgba(0,0,0,.08)",
  };

  const gradientButtonStyle = {
    background: "linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)",
    border: "none",
    borderRadius: "12px",
    height: "56px",
    fontSize: "15px",
    fontWeight: "600",
    boxShadow: "0 4px 15px rgba(255,111,115,0.4)",
    transition: "all 0.3s ease",
  };

  const outlineButtonStyle = {
    background: "white",
    border: "2px solid #ff6f73",
    color: "#ff6f73",
    borderRadius: "12px",
    height: "56px",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  };

  const valuesList = [
    "Don't be boring - Create magical experiences",
    "Stay scrappy - Embrace agility and innovation", 
    "Move with urgency - Rapid iteration and action",
    "Raise the bar - Excellence in everything we do"
  ];

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Founder",
      initials: "AC",
      description: "Visionary leader with 10+ years in AI and content creation, passionate about making design accessible to everyone."
    },
    {
      name: "Sarah Rodriguez", 
      role: "Head of Product",
      initials: "SR",
      description: "Product strategist focused on user experience and innovative features that delight our 50+ million users."
    },
    {
      name: "Marcus Johnson",
      role: "Lead Engineer", 
      initials: "MJ",
      description: "Full-stack engineer building the AI-powered tools that make content creation effortless and magical."
    }
  ];

  const contactInfo = [
    { icon: <MailOutlined />, label: "Email", value: "support@throwly.com" },
    { icon: <EnvironmentOutlined />, label: "Location", value: "Ames, Iowa" }
  ];

  const innovations = [
    {
      icon: <CameraOutlined />,
      title: "Snap and Price",
      description: "Our AI analyzes any item photo and instantly suggests a fair market value."
    },
    {
      icon: <EnvironmentFilled />,
      title: "Location & Time Smart",
      description: "Prices adjust automatically based on your marketplace and geographic location."
    },
    {
      icon: <TeamOutlined />,
      title: "Community Verified",
      description: "Human in the loop users validate suggestions, keeping prices honest and accurate over time."
    },
    {
      icon: <ShopOutlined />,
      title: "Vendor Friendly",
      description: "No more guesswork for sellers. Set fair prices that attract buyers quickly."
    }
  ];

    return (
    <div style={containerStyle}>
      {/* Hero Banner Section */}
      <div
        style={{
          width: '100%',
          position: 'relative',
          minHeight: 420,
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
            padding: "48px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
            zIndex: 1
          }}
        >
          <div style={{ flex: 1, minWidth: 280, textAlign: "center" }}>
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/gutter-bc42f.appspot.com/o/Black%20logo%20-%20no%20background.png?alt=media&token=91786a19-154b-4324-8414-a7154a9840d2" 
              alt="Logo" 
              style={{ width: "300px", height: "200px", margin: "0 auto 24px auto", display: "block" }}
            />
            <Title level={1} style={{ margin: 0, marginBottom: 12, fontWeight: 800, color: "#ffffff" }}>
              About Throwly
            </Title>
            <Paragraph style={{ fontSize: "1.125rem", color: "#ffffff", marginBottom: 24, maxWidth: "500px", margin: "0 auto" }}>
              We believe that the future of local ecommerce is free, sustainable, and rewarding
            </Paragraph>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "60px 24px" }}>

        {/* Our Story Section */}
        <Card 
          style={cardStyle} 
          bodyStyle={{ padding: "60px" }}
          className="fade-in-section"
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, cardHoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, cardStyle);
          }}
        >
          <Title level={2} style={{ textAlign: "center", fontSize: "32px", fontWeight: "bold", color: "#1a202c", marginBottom: "32px" }}>
            Our Story
          </Title>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Paragraph style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "20px", fontSize: "16px", textAlign: "center" }}>
              Throwly was born from a simple question: why should generosity be a one-way street? We saw students and neighbors giving away perfectly good items for free—only to later buy the same things again at full price. That's when we set out to create a smarter solution.
            </Paragraph>
            <Paragraph style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "20px", fontSize: "16px", textAlign: "center" }}>
              What started as an idea in Ames, Iowa grew into the first point-based, AI-powered marketplace designed for real communities. Today, Throwly helps people turn old dorm furniture into points for kitchen gear, or swap unused clothes for something new—all while reducing waste and building stronger local connections.
            </Paragraph>
            <Paragraph style={{ color: "#64748b", lineHeight: "1.8", fontSize: "16px", textAlign: "center" }}>
              Throwly isn't just a marketplace—it's a movement to make giving back easy, rewarding, and fun.
            </Paragraph>
          </div>
        </Card>

        {/* Mission & Values */}
        <Row gutter={40} style={{ marginBottom: "40px" }}>
          {/* Mission */}
          <Col xs={24} md={12}>
            <Card 
              style={cardStyle} 
              bodyStyle={{ padding: "40px", textAlign: "center" }}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, cardHoverStyle);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, cardStyle);
              }}
            >
              <Avatar
                size={64}
                style={{
                  background: "linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)",
                  marginBottom: "16px"
                }}
                icon={<ThunderboltOutlined style={{ fontSize: "32px", color: "white" }} />}
              />
              <Title level={3} style={{ fontSize: "24px", fontWeight: "bold", color: "#1a202c", marginBottom: "16px" }}>
                Our Mission
              </Title>
              <Paragraph style={{ color: "#64748b", lineHeight: "1.8", textAlign: "center", fontSize: "16px" }}>
              Our mission is to remove friction from local exchanges and make generosity rewarding. With AI-powered pricing and a point-based system, Throwly reimagines Facebook Marketplace for the future—helping you list, earn, and redeem with ease.
              </Paragraph>
            </Card>
          </Col>

          {/* Values */}
          <Col xs={24} md={12}>
            <Card 
              style={cardStyle} 
              bodyStyle={{ padding: "40px", textAlign: "center" }}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, cardHoverStyle);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, cardStyle);
              }}
            >
              <Avatar
                size={64}
                style={{
                  background: "linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)",
                  marginBottom: "16px"
                }}
                icon={<ThunderboltOutlined style={{ fontSize: "32px", color: "white" }} />}
              />
              <Title level={3} style={{ fontSize: "24px", fontWeight: "bold", color: "#1a202c", marginBottom: "16px" }}>
                Our Vision
              </Title>
              <Paragraph style={{ color: "#64748b", lineHeight: "1.8", textAlign: "center", fontSize: "16px" }}>
              We envision a future where local e-commerce is free, sustainable, and rewarding. Throwly turns everyday giving into community impact by making it easy to share, reuse, and connect. Every exchange reduces waste, saves money, and strengthens local bonds.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* Key Innovations Section */}
        <Card 
          style={cardStyle} 
          bodyStyle={{ padding: "60px" }}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, cardHoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, cardStyle);
          }}
        >
          <Title level={2} style={{ textAlign: "center", fontSize: "32px", fontWeight: "bold", color: "#1a202c", marginBottom: "32px" }}>
            Key Innovations
          </Title>
          <Row gutter={[40, 32]}>
            {innovations.map((innovation, index) => (
              <Col xs={24} md={12} key={index}>
                <div 
                  style={{ 
                    display: "flex", 
                    alignItems: "flex-start", 
                    padding: "32px",
                    borderRadius: "16px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    height: "100%",
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f1f5f9";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px -5px rgba(0,0,0,.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8fafc";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Avatar
                    size={48}
                    style={{
                      background: "linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)",
                      marginRight: "16px",
                      flexShrink: 0
                    }}
                    icon={innovation.icon}
                  />
                  <div>
                    <Title level={4} style={{ 
                      fontSize: "18px", 
                      fontWeight: "600", 
                      color: "#1a202c", 
                      marginBottom: "8px",
                      margin: "0 0 8px 0"
                    }}>
                      {innovation.title}
                    </Title>
                    <Paragraph style={{ 
                      color: "#64748b", 
                      fontSize: "14px", 
                      lineHeight: "1.6",
                      margin: 0
                    }}>
                      {innovation.description}
                    </Paragraph>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* Team Section  - commented out for now
        <Card style={cardStyle} bodyStyle={{ padding: "48px" }}>
          <Title level={2} style={{ textAlign: "center", fontSize: "32px", fontWeight: "bold", color: "#1a202c", marginBottom: "32px" }}>
            Meet Our Team
          </Title>
          <Row gutter={32}>
            {teamMembers.map((member, index) => (
              <Col xs={24} md={8} key={index}>
                <div style={{ textAlign: "center" }}>
                  <Avatar
                    size={96}
                    style={{
                      background: "linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)",
                      marginBottom: "16px",
                      fontSize: "24px",
                      fontWeight: "bold"
                    }}
                  >
                    {member.initials}
                  </Avatar>
                  <Title level={4} style={{ fontSize: "20px", fontWeight: "600", color: "#1a202c", marginBottom: "8px" }}>
                    {member.name}
                  </Title>
                  <Text style={{ color: "#64748b", fontSize: "16px", marginBottom: "12px", display: "block" }}>
                    {member.role}
                  </Text>
                  <Paragraph style={{ color: "#64748b", fontSize: "14px", textAlign: "center", margin: "0" }}>
                    {member.description}
                  </Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
        */}
        {/* Contact & CTA Section */}
        <Card 
          style={cardStyle} 
          bodyStyle={{ padding: "60px", textAlign: "center" }}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, cardHoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, cardStyle);
          }}
        >
          <Title level={2} style={{ fontSize: "32px", fontWeight: "bold", color: "#1a202c", marginBottom: "24px" }}>
            Ready to Give & Get Locally?
          </Title>
          <Paragraph style={{ color: "#64748b", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px auto", fontSize: "16px", lineHeight: "1.6" }}>
            Turn your unused items into rewards and discover what your community has to offer. With Throwly, sustainable living has never been easier.
          </Paragraph>
          
          <div style={{ marginBottom: "32px" }}>
            <Button
              type="primary"
              size="large"
              style={gradientButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(255,71,87,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(255,111,115,0.4)";
              }}
            >
              Download now
            </Button>
            
            <Button
              size="large"
              style={{
                ...outlineButtonStyle,
                marginLeft: "16px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ff6f73";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "#ff6f73";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Browse Throwly
            </Button>
          </div>

          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "40px", marginTop: "40px" }}>
            <Row gutter={[48, 32]} justify="center">
              {contactInfo.map((info, index) => (
                <Col xs={24} sm={12} key={index} style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ 
                      fontSize: "20px", 
                      color: "#ff6f73", 
                      marginBottom: "8px" 
                    }}>
                      {info.icon}
                    </div>
                    <Title level={4} style={{ fontSize: "16px", fontWeight: "600", color: "#1a202c", marginBottom: "8px" }}>
                      {info.label}
                    </Title>
                    <Text style={{ color: "#64748b", fontSize: "16px", whiteSpace: "pre-line" }}>
                      {info.value}
                    </Text>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;

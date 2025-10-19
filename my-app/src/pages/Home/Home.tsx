import React from "react";
import { Layout, Typography, Row, Col, Card } from "antd";
import SearchBar from "../../components/home/SearchBar";
import {electronics, furniture, home, kids, womens, mens} from "../../assets/images/home_images";
import AppStoreImage from "../../assets/images/Download_images/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.jpg";
import GooglePlayImage from "../../assets/images/Download_images/GetItOnGooglePlay_Badge_Web_color_English.png";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Home() {
    const [onResults, setOnResults] = React.useState<any[]>([]);
  const categories = [
    { name: "Electronics & Appliances", img: electronics },
    { name: "Furniture", img: furniture },
    { name: "Home & Garden", img: home },
    { name: "Baby & Kids", img: kids },
    { name: "Women's Fashion", img: womens },
    { name: "Men's Fashion", img: mens },
  ];

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* Top Navigation */}

      {/* Search Bar */}
      <SearchBar redirectOnSearch={true} />

      {/* Categories Section */}
      <Content style={{ padding: "40px 50px", textAlign: "center" }}>
        <Title level={3}>Explore all categories</Title>
        <Row gutter={[32, 32]} justify="center" style={{ marginTop: "30px" }}>
          {categories.map((cat) => (
            <Col key={cat.name} xs={12} sm={8} md={6} lg={4} style={{ textAlign: "center" }}>
              <div>
                <img
                  src={cat.img}
                  alt={cat.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid #eee",
                    marginBottom: "10px",
                  }}
                />
                <Text>{cat.name}</Text>
              </div>
            </Col>
          ))}
        </Row>
      </Content>


      {/* Promo Section */}
      <Content
        style={{
          padding: "60px 50px",
          backgroundColor: "#fff5f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Left */}
        <div style={{ maxWidth: "400px" }}>
          <Title level={3} style={{ fontWeight: "bold" }}>
            Discover great finds today!
          </Title>
          <Text>Get the app</Text>
          <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
            <a 
              href="https://apps.apple.com/us/app/throwly/id1615326703?platform=iphone" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <img 
                src={AppStoreImage} 
                alt="Download on the App Store" 
                style={{ 
                  height: "50px",
                  width: "150px",
                  borderRadius: "6px",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                  objectFit: "cover"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              />
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=com.Gutter" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <img 
                src={GooglePlayImage} 
                alt="Get it on Google Play" 
                style={{ 
                  height: "50px",
                  width: "150px",
                  borderRadius: "6px",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                  objectFit: "cover"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              />
            </a>
          </div>
        </div>

        {/* Right */}
        
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center", backgroundColor: "#111", color: "#bbb" }}>
        © {new Date().getFullYear()} Throwly. All rights reserved.
      </Footer>
    </Layout>
  );
}

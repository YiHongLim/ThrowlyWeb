import React from "react";
import { Layout, Typography, Row, Col, Card } from "antd";
import NavBar from "../../components/home/NavBar";
import SearchBar from "../../components/home/SearchBar";
import {electronics, furniture, home, kids, womens, mens, apple, playstore} from "../../assets/images/home_images";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Home() {
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
      <NavBar />

      {/* Search Bar */}
      <SearchBar />

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
            <img src= {apple} alt="App Store" style={{ height: "40px" }} />
            <img src= {playstore} alt="Google Play" style={{ height: "40px" }} />
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

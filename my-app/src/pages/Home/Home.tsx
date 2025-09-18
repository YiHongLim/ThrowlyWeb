import React from "react";
import { Layout, Typography, Row, Col, Card, Button } from "antd";
import NavBar from "../../components/NavBar";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  const categories = [
    { name: "Electronics & Appliances", img: "/electronics.png" },
    { name: "Furniture", img: "/furniture.png" },
    { name: "Home & Garden", img: "/home.png" },
    { name: "Baby & Kids", img: "/kids.png" },
    { name: "Women's Fashion", img: "/womens.png" },
    { name: "Men's Fashion", img: "/mens.png" },
    { name: "Health & Beauty", img: "/beauty.png" },
  ];

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <NavBar />

      {/* Categories Section */}
      <Content style={{ padding: "40px 50px", textAlign: "center" }}>
        <Title level={3}>Explore all categories</Title>
        <Row gutter={[32, 32]} justify="center" style={{ marginTop: "30px" }}>
          {categories.map((cat) => (
            <Col key={cat.name} xs={12} sm={8} md={6} lg={4}>
              <Card
                hoverable
                cover={
                  <img
                    src={cat.img}
                    alt={cat.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      margin: "20px auto",
                      objectFit: "cover",
                    }}
                  />
                }
                bordered={false}
                style={{ textAlign: "center" }}
              >
                <Text>{cat.name}</Text>
              </Card>
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
            <img src="/appstore.png" alt="App Store" style={{ height: "40px" }} />
            <img
              src="/googleplay.png"
              alt="Google Play"
              style={{ height: "40px" }}
            />
          </div>
        </div>

        {/* Right */}
        <div>
          <img src="/mockup.png" alt="App Preview" style={{ maxHeight: "300px" }} />
        </div>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center", backgroundColor: "#111", color: "#bbb" }}>
        © {new Date().getFullYear()} Throwly. All rights reserved.
      </Footer>
    </Layout>
  );
}

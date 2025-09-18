import React from "react";
import { Layout, Menu, Button, Input, Row, Col, Typography } from "antd";
import {
  SearchOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

const NavBar: React.FC = () => {
  return (
    <>
      {/* --- Top Navigation Bar --- */}
      <Header
        style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          borderBottom: "1px solid #eee",
        }}
      >
        {/* Left: Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/converted_image.png"
            alt="Throwly Logo"
            style={{ height: "32px" }}
          />
          <Title level={4} style={{ margin: 0 }}>
            Throwly
          </Title>
        </div>

        {/* Center: Nav Links */}
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[]}
          style={{ flex: 1, justifyContent: "center", borderBottom: "none" }}
        >
          <Menu.Item key="shop">Shop Local</Menu.Item>
          <Menu.Item key="categories">Categories</Menu.Item>
          <Menu.Item key="overview">Overview</Menu.Item>
          <Menu.Item key="about">About Throwly</Menu.Item>
        </Menu>

        {/* Right: Auth Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <Button type="link">Sign In</Button>
          <Button type="primary" style={{ backgroundColor: "#ff6b00", border: "none" }}>
            Post
          </Button>
        </div>
      </Header>

      {/* --- Search Bar --- */}
      <div
        style={{
          borderBottom: "1px solid #eee",
          padding: "16px 40px",
          backgroundColor: "#fff",
        }}
      >
        <Row gutter={16} align="middle">
          {/* Location Dropdown (placeholder) */}
          <Col flex="200px">
            <Button block>Story County ▼</Button>
          </Col>

          {/* Search Input */}
          <Col flex="auto">
            <Input
              placeholder="What are you looking for?"
              suffix={<SearchOutlined />}
              style={{ borderRadius: "6px" }}
            />
          </Col>
        </Row>

        {/* Popular Keywords */}
        <Row
          style={{
            marginTop: "8px",
            gap: "16px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          {[
            "Popular",
            "ikea",
            "lululemon",
            "playstation",
            "patagonia",
            "yeti cooler",
            "xbox",
            "nintendo switch",
            "samsung",
            "sofa",
            "dresser",
            "iphone",
            "coffee table",
            "tv",
            "couch",
            "free",
            "desk",
          ].map((word) => (
            <span key={word} style={{ cursor: "pointer" }}>
              {word}
            </span>
          ))}
        </Row>
      </div>
    </>
  );
};

export default NavBar;

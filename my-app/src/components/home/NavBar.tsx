import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import {gutter} from "../../assets/images/home_images";
const { Header } = Layout;
const { Title } = Typography;

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
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
          src={gutter}
          alt="Throwly Logo"
          style={{ height: "32px" }}
        />
        <Title level={4} style={{ margin: 0 }}>
          Throwly
        </Title>
      </div>

      {/* Center Nav Links */}
      <Menu
        mode="horizontal"
        defaultSelectedKeys={[]}
        style={{ flex: 1, justifyContent: "center", borderBottom: "none" }}
      >
        <Menu.Item key="shop">Shop Local</Menu.Item>
        <Menu.Item key="categories">
          <a href={"/listings"}>Categories</a>
          </Menu.Item>
        <Menu.Item key="furnish">
          <a href="/campaign-page">Go Furnish Me</a>
        </Menu.Item>
        <Menu.Item key="overview">Overview</Menu.Item>
        <Menu.Item key="about">About Throwly</Menu.Item>
        <Menu.Item key="cart">
          <a href="/cart">Cart</a>
        </Menu.Item>
      </Menu>

      {/* Right Auth Buttons and Cart */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {user ? (
          <span 
            style={{ 
              color: "#1890ff", 
              fontWeight: "300", 
              fontSize: "12px",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "4px",
              transition: "background-color 0.2s"
            }}
            onClick={handleSignOut}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {user.displayName || user.email|| "User"}
          </span>
        ) : (
          <Button type="link" onClick={() => navigate("/login")}>
            Sign In
          </Button>
        )}
        <Button
          type="primary"
          style={{ backgroundColor: "#ff6b00", border: "none" }}
        >
          Post
        </Button>
      </div>
    </Header>
  );
};

export default NavBar;

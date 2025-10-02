import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {gutter} from "../../assets/images/home_images";
const { Header } = Layout;
const { Title } = Typography;

/**
 * Get user data from Firestore Users collection
 * @param uid - The user's Firebase Auth UID
 * @returns User data object or null if not found
 */
export const getUserData = async (uid: string): Promise<any | null> => {
  try {
    const userRef = doc(db, "Users", uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    }
    return null;
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null;
  }
};

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch username from Firestore Users collection
        try {
          const userRef = doc(db, "Users", user.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUsername(userData?.username || null);
          } else {
            setUsername(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUsername(null);
        }
      } else {
        setUsername(null);
      }
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
      <button
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer"
        }}
        aria-label="Go to home"
      >
        <img
          src={gutter}
          alt="Throwly Logo"
          style={{ height: "32px" }}
          className={"rounded-md"}
        />
        <Title level={4} style={{ margin: 0 }}>
          Throwly
        </Title>
      </button>

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
        <Menu.Item key="about">
          <a href="/about">About Throwly</a>
        </Menu.Item>
        <Menu.Item key="faq">
          <a href="/faq">FAQ</a>
        </Menu.Item>
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
            {username || user.email || "User"}
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

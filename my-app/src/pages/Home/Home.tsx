import React from "react";
import { Container, Typography, Box } from "@mui/material";
import NavBar from "../../components/NavBar";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#fff",
        color: "#111",
        margin: 0,
        padding: 0
      }}
    >
      <NavBar />

      {/* --- Categories Section --- */}
      <Container maxWidth="lg" style={{ padding: "40px 0", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Explore all categories
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={4}
          mt={4}
        >
          {[
            { name: "Electronics & Appliances", img: "/electronics.png" },
            { name: "Furniture", img: "/furniture.png" },
            { name: "Home & Garden", img: "/home.png" },
            { name: "Baby & Kids", img: "/kids.png" },
            { name: "Women's Fashion", img: "/womens.png" },
            { name: "Men's Fashion", img: "/mens.png" },
            { name: "Health & Beauty", img: "/beauty.png" }
          ].map((cat) => (
            <Box key={cat.name} textAlign="center">
              <img
                src={cat.img}
                alt={cat.name}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #eee"
                }}
              />
              <Typography variant="body2" mt={1}>
                {cat.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* --- Promo Section --- */}
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="#fff5f0"
        p={6}
      >
        {/* Left text */}
        <Box maxWidth="400px">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Discover great finds today!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Get the app
          </Typography>
          <Box display="flex" gap={2} mt={2}>
            <img src="/appstore.png" alt="App Store" style={{ height: "40px" }} />
            <img src="/googleplay.png" alt="Google Play" style={{ height: "40px" }} />
          </Box>
        </Box>

        {/* Right mockup */}
        <Box>
          <img src="/mockup.png" alt="App Preview" style={{ maxHeight: "300px" }} />
        </Box>
      </Box>

      {/* --- Footer --- */}
      <footer
        style={{
          backgroundColor: "#111",
          color: "#bbb",
          textAlign: "center",
          padding: "24px"
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Throwly. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
}

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Paper,
  InputBase,
  Container
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      backgroundColor: "#fff",
      color: "#111",
      margin: 0,
      padding: 0
    }}>
      {/* --- Top Navigation Bar --- */}
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          {/* Left: Logo */}
          <Box display="flex" alignItems="center" gap={2}>
            <img
              src="/converted_image.png"
              alt="Throwly Logo"
              style={{ height: "32px" }}
            />
            <Typography variant="h6" fontWeight="bold">
              Throwly
            </Typography>
          </Box>

          {/* Center: Nav Links */}
          <Box display="flex" alignItems="center" gap={3}>
            <Button color="inherit">Shop Local</Button>
            <Button color="inherit">Categories</Button>
            <Button color="inherit">Overview</Button>
            <Button color="inherit">About Throwly</Button>
          </Box>

          {/* Right: Auth Buttons */}
          <Box display="flex" alignItems="center" gap={2}>
            <Button color="inherit">Sign In</Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#ff6b00", color: "#fff" }}
            >
              Post
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* --- Search Bar Below Navbar --- */}
      <Box
        style={{
          borderBottom: "1px solid #eee",
          padding: "16px 0",
          backgroundColor: "#fff"
        }}
      >
        <Container
          maxWidth="lg"
          style={{ display: "flex", alignItems: "center", gap: "16px" }}
        >
          {/* Location Dropdown */}
          <Button
            variant="outlined"
            style={{ borderRadius: "20px", textTransform: "none" }}
          >
            Story County ▼
          </Button>

          {/* Search Input */}
          <Paper
            component="form"
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              padding: "2px 8px",
              border: "1px solid #ddd"
            }}
          >
            <InputBase
              placeholder="What are you looking for?"
              inputProps={{ "aria-label": "search" }}
              style={{ flex: 1 }}
            />
            <SearchIcon />
          </Paper>
        </Container>

        {/* Popular Keywords Row */}
        <Container
          maxWidth="lg"
          style={{
            marginTop: "8px",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            fontSize: "14px",
            color: "#555"
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
            "desk"
          ].map((word) => (
            <span key={word} style={{ cursor: "pointer" }}>
              {word}
            </span>
          ))}
        </Container>
      </Box>

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
            <img
              src="/googleplay.png"
              alt="Google Play"
              style={{ height: "40px" }}
            />
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

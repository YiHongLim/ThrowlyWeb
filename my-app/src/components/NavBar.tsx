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
import { useNavigate } from "react-router-dom";


const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
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
          <Button color="inherit" href={"/campaign-page"}>Go Furnish Me</Button>
          <Button color="inherit">Overview</Button>
            <Button color="inherit">About Throwly</Button>
          </Box>

          {/* Right: Auth Buttons */}
          <Box display="flex" alignItems="center" gap={2}>
            <Button color="inherit" onClick={() => navigate('/login')}>Sign In</Button>
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
    </div>
  );
};

export default NavBar;

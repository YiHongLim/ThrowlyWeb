import React from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", width: "100%", backgroundColor: "#fff", color: "#111" }}>
      {/* Header */}
      <header
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            backgroundColor: "#fff",
            borderBottom: "1px solid #e0e0e0"
        }}
        >

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src="/converted_image.png"
            alt="Throwly Logo"
            style={{ height: "40px" }}
          />
          <Typography variant="h6" fontWeight="bold">
            Throwly
          </Typography>
        </div>
        <nav style={{ display: "flex", gap: "24px" }}>
          <a href="#about">About</a>
          <a href="#product">Product</a>
          <a href="#community">Community</a>
          <a href="#more">More</a>
        </nav>
        <div style={{ display: "flex", gap: "16px" }}>
          <Button variant="text">Log In</Button>
          <Button variant="contained" color="success">
            Download App
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          textAlign: "center",
          padding: "100px 24px",
          backgroundColor: "#f9f9f9"
        }}
      >
        <img
          src="/Stationary photo"
          alt="Hero"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.2
          }}
        />
        <Container maxWidth="md" style={{ position: "relative" }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            The Future of local e-commerce is Free, Sustainable, & Rewarding
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to the future of local e-commerce! Picture a world where you
            can easily access free, reused items through a safe and
            user-friendly platform that rewards your sustainable choices.
          </Typography>
          <Typography variant="body1" paragraph>
            Earn points redeemable at local thrift stores. Use AI to get
            personalized recommendations and automate posting with just one
            image.
          </Typography>
          <Button variant="contained" color="success" size="large">
            Get Started
          </Button>
        </Container>
      </section>

      {/* Features (Flexbox instead of Grid) */}
      <Container maxWidth="lg" style={{ padding: "64px 24px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center"
          }}
        >
          <Card style={{ flex: "1 1 300px", maxWidth: "400px" }}>
            <CardContent style={{ textAlign: "center" }}>
              <PeopleIcon style={{ fontSize: 48, color: "green", marginBottom: 16 }} />
              <Typography variant="h6" gutterBottom>
                Free & Rewarding
              </Typography>
              <Typography variant="body2">
                Every item is free and accessible. Earn points redeemable at
                thrift stores and enjoy faster delivery than Amazon.
              </Typography>
            </CardContent>
          </Card>

          <Card style={{ flex: "1 1 300px", maxWidth: "400px" }}>
            <CardContent style={{ textAlign: "center" }}>
              <SecurityIcon style={{ fontSize: 48, color: "green", marginBottom: 16 }} />
              <Typography variant="h6" gutterBottom>
                Safety
              </Typography>
              <Typography variant="body2">
                Safe and secure e-commerce with a strong emphasis on user
                safety. Completely free and risk-free.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>

      {/* About */}
      <section id="about" style={{ backgroundColor: "#f9f9f9", padding: "80px 24px" }}>
        <Container maxWidth="md" style={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            About Throwly
          </Typography>
          <Typography variant="body1" paragraph>
            Our journey began with a passion for preloved items and a commitment
            to sustainability. We aim to revolutionize local e-commerce with a
            safer, rewarding, and environmentally conscious marketplace.
          </Typography>
          <Typography variant="body1" paragraph>
            Our technology leverages AI to enhance convenience and satisfaction
            while prioritizing sustainability.
          </Typography>
        </Container>
      </section>

      {/* Testimonial */}
      <section id="community" style={{ padding: "80px 24px" }}>
        <Container maxWidth="sm" style={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Community Feedback
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontStyle: "italic" }}
          >
            “Throwly's platform has provided me with a safe and rewarding
            e-commerce experience. I appreciate their commitment to
            sustainability and user safety.”
          </Typography>
          <Typography variant="subtitle1">— Customer at Throwly</Typography>
        </Container>
      </section>

      {/* CTA */}
      <section
        style={{
          backgroundColor: "#2e7d32",
          color: "#fff",
          textAlign: "center",
          padding: "80px 24px"
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Join the Movement
          </Typography>
          <Typography variant="body1" paragraph>
            Experience the future of sustainable e-commerce. Schedule a demo
            with our team today.
          </Typography>
          <Button
            variant="contained"
            size="large"
            style={{ backgroundColor: "#fff", color: "#2e7d32" }}
          >
            Get a Demo
          </Button>
        </Container>
      </section>

      {/* Footer */}
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

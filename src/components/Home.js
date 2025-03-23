import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import brainImage from "../assets/brain.jpg"; // Replace with your hero image path

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right,rgb(239, 234, 234),rgb(151, 150, 150))",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      {/* Styled Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: "#343a40" }} variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="/" style={{ fontWeight: "bold", fontSize: "1.5rem", color:"#FFC107"}}>
            BrainScan AI
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={handleGetStarted}>Login</Nav.Link>
              <Nav.Link onClick={handleRegister}>Register</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#about">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="container text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Brain Tumor Detection System</h1>
        <p className="lead mb-4">
          Upload MRI images to detect and classify brain tumors using AI.
        </p>
        <div style={{ position: "relative", textAlign: "left", color: "white" }}>
          <img
            src={brainImage}
            alt="Brain MRI"
            style={{ width: "100%", height: "auto", borderRadius: "12px" }}
          />

          {/* Overlay Layer */}
          <div
            style={{
              position: "absolute",
              top: "60%",
              left: "3%",
              backgroundColor: "rgba(134, 131, 131, 0.5)",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "80%",
            }}
          >
            <h2>Early Detection Saves Lives</h2>
            <p style={{ color: "yellow", fontWeight: "bold" }}>
              Upload MRI images and receive instant, accurate brain tumor
              classification using AI.
            </p>
            <Button variant="light" onClick={handleGetStarted}>
              Get Started &rarr;
            </Button>
          </div>
        </div>
      </div>


      {/* About Us Section */}
      <div id="about" className="container mt-5">
        <h2 className="text-center mb-4">About Us</h2>
        <div className="row align-items-center">
          <div className="col-md-6 mb-4">
            <p className="fs-5">
              Our project is dedicated to advancing healthcare diagnostics through technology.
              Using AI and machine learning, we provide fast and reliable brain tumor detection 
              to support early diagnosis and treatment planning. Our mission is to bridge the gap 
              between technology and medical practice, making healthcare accessible and efficient.
            </p>
          </div>
          <div className="col-md-6 mb-4">
            <div className="p-4 bg-white rounded shadow-sm">
              <h5>Our Vision</h5>
              <p>Revolutionize medical imaging analysis with cutting-edge AI tools that enhance lives and improve healthcare outcomes.</p>
              <h5>Contact</h5>
              <p>Email: support@brainscanai.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container">
        <h2 id="features" className="text-center mb-4">Features</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="p-4 bg-white rounded shadow-sm h-100">
              <h5>AI-Powered Detection</h5>
              <p>
                Classifies MRI images with high accuracy using deep learning models.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4 bg-white rounded shadow-sm h-100">
              <h5>Secure Upload</h5>
              <p>
                Your uploaded MRI scans are processed securely and privately.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4 bg-white rounded shadow-sm h-100">
              <h5>Admin Dashboard</h5>
              <p>Admins can view and manage reports, and users too.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="text-center mt-5 text-muted">
        <hr />
        <p>© 2025 Brain Tumor Detection Project. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

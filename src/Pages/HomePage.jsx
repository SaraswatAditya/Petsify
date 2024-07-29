import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import backgroundImage from "../assets/Dollar.png"; // Import the image

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        background: `
          url(${backgroundImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to Pet Finder
      </Typography>
      <Typography variant="h5" gutterBottom>
        Find your perfect pet companion today!
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2, mb: 2 }}
          onClick={() => navigate("/search")}
        >
          Search for Pets
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mb: 2 }}
          onClick={() => navigate("/pets")}
        >
          View All Pets
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;

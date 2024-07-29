import React, { useState, useEffect } from "react";
import { fetchPets } from "../services/api";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadedPetIds, setLoadedPetIds] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const getPets = async () => {
      setLoading(true);
      try {
        const petData = await fetchPets(page);
        const newPets = petData.pets.filter((pet) => !loadedPetIds.has(pet.id));
        setPets((prevPets) => [...prevPets, ...newPets]);
        setLoadedPetIds(
          (prevIds) => new Set([...prevIds, ...newPets.map((pet) => pet.id)])
        );
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    getPets();
  }, [page]);

  const handleCardClick = (id) => {
    navigate(`/pets/${id}`);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f0fff4, #c6f6d5)",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {error && <Typography color="error">{error}</Typography>}
      <Box className="m-8" style={{ width: "100%", maxWidth: "1200px", marginBottom: "2rem" }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ color: "#2f855a" }}
        >
          All Pets
        </Typography>
        <Grid container spacing={4}>
          {pets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet.id}>
              <Card
                className="hover:shadow-2xl mt-3"
                sx={{
                  height: "400px",
                  border: "5px solid #ffffff",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => handleCardClick(pet.id)}
              >
                {pet.images.length > 0 && (
                  <Carousel
                    indicators={false}
                    navButtonsAlwaysInvisible={true}
                    autoPlay={true}
                  >
                    {pet.images.map((image, index) => (
                      <CardMedia
                        className="hover:scale-125 ease-in duration-200"
                        key={index}
                        component="img"
                        style={{
                          height: 300,
                          objectFit: "contain",
                          cursor: "pointer",
                        }}
                        image={image}
                        alt={pet.name}
                      />
                    ))}
                  </Carousel>
                )}
                <CardContent>
                  <Typography variant="h5" sx={{ color: "#2f855a" }}>
                    {pet.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Breed: {pet.breed}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography variant="body2" color="textSecondary">
                      {pet.city}, {pet.state}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {loading && <CircularProgress />}
      <Button
        variant="contained"
        color="primary"
        onClick={handleLoadMore}
        disabled={loading}
        sx={{ mt: 4 }}
      >
        Load More
      </Button>
    </Container>
  );
};

export default PetList;

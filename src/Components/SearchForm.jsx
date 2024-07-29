import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBreedsByAnimal, searchPets } from "../services/api";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Carousel from "react-material-ui-carousel";

const animalTypes = ["dog", "cat", "bird", "rabbit", "reptile"];

const SearchForm = () => {
  const [animal, setAnimal] = useState("");
  const [location, setLocation] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getBreeds = async () => {
      if (animal) {
        setLoading(true);
        try {
          const breedData = await fetchBreedsByAnimal(animal);
          setBreeds(breedData.breeds);
          setBreed(""); // Reset breed selection when animal type changes
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      } else {
        setBreeds([]);
        setBreed(""); // Reset breed selection when no animal is selected
      }
    };
    getBreeds();
  }, [animal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const searchData = await searchPets(animal, location, breed);
      setSearchResults(searchData.pets);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/pets/${id}`);
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
      <Box
        component={Paper}
        elevation={6}
        sx={{
          padding: "2rem",
          borderRadius: "10px",
          background: "#fff",
          width: "100%",
          maxWidth: "600px",
          mb: 4,
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ color: "#2f855a" }}>
          Search for Pets
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          {error && <Typography color="error">{error}</Typography>}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Animal Type</InputLabel>
            <Select
              value={animal}
              onChange={(e) => setAnimal(e.target.value)}
              label="Animal Type"
            >
              {animalTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Breed</InputLabel>
            <Select
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              label="Breed"
              disabled={loading || !breeds.length}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {loading ? (
                <MenuItem value="">
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                breeds.map((breed) => (
                  <MenuItem key={breed} value={breed}>
                    {breed}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: "#2f855a",
              "&:hover": {
                backgroundColor: "#276749",
              },
            }}
          >
            Search
          </Button>
        </Box>
      </Box>
      {loading && <CircularProgress />}
      {searchResults.length > 0 && (
        <Box sx={{ width: "100%", maxWidth: "1200px", mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Search Results:
          </Typography>
          <Grid container spacing={4}>
            {searchResults.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet.id}>
                <Card
                  className="hover:shadow-2xl"
                  sx={{
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
                            height:300,
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
      )}
      {searchResults.length === 0 && breeds.length > 0 && (
        <Box className="mt-5">
          <Typography variant="body1" gutterBottom>
            No Pets Found. Try selecting a different breed.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default SearchForm;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPetById } from "../services/api";
import { Container, Typography, Box, Modal, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PetsIcon from "@mui/icons-material/Pets";
import BreedIcon from "@mui/icons-material/Pets"; // Assuming there's an icon for breed; replace it with the appropriate one if exists.
import { FactCheck } from "@mui/icons-material";

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const getPet = async () => {
      try {
        const petData = await fetchPetById(id);
        setPet(petData.pets[0]);
        // console.log("pet data ", petData.pets[0]);
      } catch (error) {
        setError(error.message);
      }
    };
    getPet();
  }, [id]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!pet) {
    return <Typography>Loading...</Typography>;
  }

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
      <Box >
        <Carousel 
          indicators={true}
          navButtonsAlwaysInvisible={true}
          autoPlay={true}
        >
          {pet.images.map((image, index) => (
            <CardMedia
              key={index}
              component="img"
              style={{
                height: "450px",
                objectFit: "contain",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              image={image}
              alt={pet.name}
              onClick={() => handleImageClick(image)}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          ))}
        </Carousel>
        <Box p={3}>
          <Typography variant="h4" align="center" gutterBottom>
            {pet.name}
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <LocationOnIcon />
            <Typography
              variant="body1"
              align="center"
              color="textSecondary"
              marginLeft={1}
            >
              {pet.city}, {pet.state}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <PetsIcon />
            <Typography
              variant="body1"
              align="center"
              color="textSecondary"
              marginLeft={1}
            >
              {pet.animal.charAt(0).toUpperCase() + pet.animal.slice(1)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <FactCheck />
            <Typography
              variant="body1"
              align="center"
              color="textSecondary"
              marginLeft={1}
            >
              Breed: {pet.breed}
            </Typography>
          </Box>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            marginTop={2}
          >
            Description
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="textSecondary"
            marginTop={1}
          >
            {pet.description}
          </Typography>
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflowY: "auto",
            backgroundColor: "white",
            boxShadow: 24,
            padding: "20px",
          }}
        >
          <img src={selectedImage} alt={pet.name} />
        </Box>
      </Modal>
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
    </Container>
  );
};

export default PetDetails;

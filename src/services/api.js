import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = "http://pets-v2.dev-apis.com";


const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

const handleError = (error) => {
  let errorMessage = '';

  if (error.response) {
    errorMessage = `Error: ${error.response.status} ${error.response.data}`;
  } else if (error.request) {
    errorMessage = 'Error: No response received from server.';
  } else {
    errorMessage = `Error: ${error.message}`;
  }

  return errorMessage;
};

export const fetchPets = async (page = 1) => {
  try {
    const response = await api.get(`/pets?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const fetchPetById = async (id) => {
  try {
    const response = await api.get(`/pets?id=${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const fetchBreedsByAnimal = async (animal) => {
  try {
    const response = await api.get(`/breeds?animal=${animal}`);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const searchPets = async (animal, location, breed) => {
  try {
    const response = await api.get(`/pets?animal=${animal}&location=${location}&breed=${breed}`);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

import axios from 'axios';

// Set the base URL for the backend API
const API_URL = 'http://localhost:5000/api/';

// Function to register a new user
export const registerUser = (userData) => {
  return axios.post(`${API_URL}auth/register`, userData);
};

// Function to login a user and get the JWT token
export const loginUser = (userData) => {
  return axios.post(`${API_URL}auth/login`, userData);
};

// Function to set the authorization token in headers
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

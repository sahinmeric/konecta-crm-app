import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

export const registerUser = (userData) => axios.post(`${API_URL}auth/register`, userData);

export const loginUser = (userData) => axios.post(`${API_URL}auth/login`, userData);

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getEmployees = () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}employees`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const addEmployee = (employeeData) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API_URL}employees`, employeeData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

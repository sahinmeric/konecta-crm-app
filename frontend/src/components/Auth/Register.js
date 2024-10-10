import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';
import { Container, TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl, Grid2 } from '@mui/material';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'employee',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      console.log('User registered successfully:', response.data);
      alert('Registration Successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration Failed!');
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h4" component="h1" sx={{ marginBottom: 3 }}>
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Grid2 container spacing={2} direction="column">
          <Grid2 item>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Grid2>
          <Grid2 item>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid2>
          <Grid2 item>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 item sx={{ marginTop: 2 }}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Register
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}

export default Register;

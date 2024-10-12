import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/api';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid2,
  CircularProgress,
  Snackbar
} from '@mui/material';

function Register() {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
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
    setLoading(true);
    try {
      const response = await registerUser(formData);
      console.log('User registered successfully:', response.data);
      setSnackbarMessage('User registered successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Error registering user:', error);
      setSnackbarMessage('Registration Failed! Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
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
            <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>
          </Grid2>
        </Grid2>
      </Box>
      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Button
          variant="text"
          color="secondary"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="text"
          color="primary"
          onClick={handleBack}
        >
          Back
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
}

export default Register;

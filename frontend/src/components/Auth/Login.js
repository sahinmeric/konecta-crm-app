import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, setAuthToken } from '../../services/api';
import { jwtDecode } from 'jwt-decode';
import { Container, TextField, Button, Typography, Snackbar, CircularProgress, Box, Grid2 } from '@mui/material';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
      const response = await loginUser(formData);
      const token = response.data.token;

      setAuthToken(token);
      localStorage.setItem('token', token);

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      setLoading(false);
      setSnackbarMessage('Login Successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      navigate(userRole === 'admin' ? '/admin' : '/employee');
    } catch (error) {
      setLoading(false);
      setSnackbarMessage('Login Failed! Please check your credentials.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error logging in user:', error);
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
        Login
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ marginTop: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </Grid2>
        </Grid2>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBack}
        sx={{
          alignSelf: 'flex-end',
          marginTop: 2,
        }}
      >
        Back
      </Button>
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

export default Login;

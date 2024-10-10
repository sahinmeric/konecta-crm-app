import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Grid2 } from '@mui/material';

function Home() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          marginBottom: 4,
          textAlign: 'center',
        }}
      >
        Welcome to Konecta CRM App
      </Typography>
      <Grid2 container spacing={2} justifyContent="center">
        <Grid2 item>
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: 2 }}
            component={Link}
            to="/login"
          >
            Login
          </Button>
        </Grid2>
        <Grid2 item>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ margin: 2 }}
            component={Link}
            to="/register"
          >
            Register
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default Home;

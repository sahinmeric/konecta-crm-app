import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const DashboardHeader = () => {
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.username);
      setRole(decodedToken.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1976d2',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <Typography variant="h6" color="white">
        Hello {userName}, your role is {role.charAt(0).toUpperCase() + role.slice(1)}
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        sx={{ color: 'white' }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default DashboardHeader;

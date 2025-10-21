import React from 'react';
import { useAuth } from './context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

// Import MUI components for a loading spinner
import { Box, CircularProgress } from '@mui/material'; 

const ProtectedRoute = ({ children }) => {
  // --- 1. GET isAuth AND isLoading ---
  const { isAuth, isLoading } = useAuth(); 
  const location = useLocation();

  // --- 2. CHECK LOADING STATE FIRST ---
  if (isLoading) {
    // If auth is still loading, show a centered spinner
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '80vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // --- 3. ONCE LOADING IS DONE, CHECK AUTH ---
  if (!isAuth) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // --- 4. IF LOADING IS DONE AND USER IS AUTHENTICATED ---
  return children; // Render the protected page
};

export default ProtectedRoute;
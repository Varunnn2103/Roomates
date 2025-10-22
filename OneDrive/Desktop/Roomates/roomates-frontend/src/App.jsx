import React from 'react';
import { Routes, Route, Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';

import { useAuth } from './context/AuthContext'; // <-- Import useAuth

// Page Imports
import PropertyList from './PropertyList';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import AddPropertyPage from './AddPropertyPage';
import ProtectedRoute from './ProtectedRoute';
import MyPropertiesPage from './MyPropertiesPage';
import EditPropertyPage from './EditPropertyPage';

function App() {
  const { isAuth, logout } = useAuth(); // <-- Get auth state and logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Go home after logout
  };

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            
            {/* Correct Logo Link */}
            <Typography 
              variant="h6" 
              component={RouterLink}
              to="/" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: 'bold', 
                color: 'primary.main', 
                textDecoration: 'none' 
              }}
            >
              Roomeets 🏠
            </Typography>

            {/* Navigation Links */}
            <Box>
              <Button component={RouterLink} to="/" color="inherit">
                Properties
              </Button>

              {isAuth ? (
                // --- Logged In User ---
                <>
                  <Button component={RouterLink} to="/my-properties" color="inherit">
                    My Properties
                  </Button>
                  <Button 
                    component={RouterLink} 
                    to="/add-property" 
                    color="primary" 
                    variant="contained" 
                    sx={{ mr: 2, ml: 2 }} // margin-right and margin-left
                  >
                    Add Property
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                // --- Logged Out User ---
                <>
                  <Button component={RouterLink} to="/register" color="inherit">
                    Register
                  </Button>
                  <Button component={RouterLink} to="/login" color="inherit">
                    Login
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Page Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PropertyList />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route 
              path="/my-properties" 
              element={
                <ProtectedRoute>
                  <MyPropertiesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-property" 
              element={
                <ProtectedRoute>
                  <AddPropertyPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-property/:id" 
              element={
                <ProtectedRoute>
                  <EditPropertyPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </Container>
    </div>
  );
}

export default App;

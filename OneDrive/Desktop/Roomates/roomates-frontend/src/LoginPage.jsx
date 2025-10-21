import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // <-- Import useAuth

import { 
  Container, Box, TextField, Button, 
  Typography, Alert 
} from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth(); // <-- Get the login function from context

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    axios.post('http://localhost:8080/api/auth/login', { email, password })
      .then(response => {
        // Success! Get the token from the response
        const token = response.data.token;
        // Call the global 'login' function
        login(token); 
        // Redirect to home
        navigate('/'); 
      })
      .catch(err => {
        console.error(err);
        setError(err.response ? err.response.data : "Login failed!");
      });
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8, p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5" fontWeight="bold">
          Sign In
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}

        <TextField
          label="Email Address"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
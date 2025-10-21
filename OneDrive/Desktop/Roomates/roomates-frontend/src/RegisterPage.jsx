import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import MUI components
import { 
  Container, Box, TextField, Button, 
  Typography, Alert 
} from '@mui/material';

const RegisterPage = () => {
  // ... (Your useState and handleSubmit logic is 100% correct, no change) ...
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const registerData = { name, email, password };

    axios.post('http://localhost:8080/api/auth/register', registerData)
      .then(response => {
        console.log(response.data);
        navigate('/'); // Redirect to home
      })
      .catch(err => {
        console.error(err);
        setError(err.response ? err.response.data : "Registration failed!");
      });
  };

  return (
    <Container maxWidth="xs"> {/* xs = extra small, good for forms */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8, // margin-top
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5" fontWeight="bold">
          Create an Account
        </Typography>

        {/* Show an error message if one exists */}
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}

        <TextField
          label="Full Name"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email Address"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="email"
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
          onChange={(e) => setPassword(e.target.value)} /> 
          <Button type="submit" fullWidth variant="contained" size="large" 
          sx={{ mt: 3, mb: 2 }}> Register 
          </Button> 
          </Box> 
          </Container> 
          ); 
        };
  
export default RegisterPage;
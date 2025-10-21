import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { 
  Container, Box, TextField, Button, Typography, Alert,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio 
} from '@mui/material';

const AddPropertyPage = () => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('FLAT'); // Default value
  const [availability, setAvailability] = useState(true); // Default value
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const propertyData = {
      title,
      city,
      price: parseFloat(price),
      type,
      availability
    };

    // Because of our AuthContext, Axios will AUTOMATICALLY add
    // the "Authorization: Bearer <token>" header to this request.
    axios.post('http://localhost:8080/api/properties', propertyData)
      .then(response => {
        console.log(response.data);
        navigate('/'); // Redirect to home on success
      })
      .catch(err => {
        console.error(err);
        let errorMsg = err.response ? err.response.data : "Failed to create property";
        if (err.response && err.response.status === 403) {
          errorMsg = "You must be logged in to create a property.";
        }
        setError(errorMsg);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 4, p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Add a New Property
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        <TextField
          label="Property Title"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="City"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="Price (per month)"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Type</FormLabel>
          <RadioGroup row value={type} onChange={(e) => setType(e.target.value)}>
            <FormControlLabel value="FLAT" control={<Radio />} label="Flat" />
            <FormControlLabel value="PG" control={<Radio />} label="PG" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Availability</FormLabel>
          <RadioGroup row value={availability} onChange={(e) => setAvailability(e.target.value === 'true')}>
            <FormControlLabel value={true} control={<Radio />} label="Available" />
            <FormControlLabel value={false} control={<Radio />} label="Not Available" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Property
        </Button>
      </Box>
    </Container>
  );
};

export default AddPropertyPage; 
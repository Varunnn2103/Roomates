import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Container, Box, TextField, Button, Typography, Alert,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CircularProgress 
} from '@mui/material';

const EditPropertyPage = () => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('FLAT');
  const [availability, setAvailability] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams(); // Get the property ID from the URL

  // 1. Fetch the existing property data
  useEffect(() => {
    // We can use the public /api/properties/{id} endpoint
    axios.get(`http://localhost:8080/api/properties/${id}`)
      .then(response => {
        const prop = response.data;
        setTitle(prop.title);
        setCity(prop.city);
        setPrice(prop.price);
        setType(prop.type);
        setAvailability(prop.availability);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Could not load property data.");
        setLoading(false);
      });
  }, [id]);

  // 2. Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const propertyData = {
      title, city,
      price: parseFloat(price),
      type, availability
    };

    // Use the PUT endpoint. Auth token is added automatically.
    axios.put(`http://localhost:8080/api/properties/${id}`, propertyData)
      .then(response => {
        navigate('/my-properties'); // Go back to My Properties list
      })
      .catch(err => {
        console.error(err);
        setError("Failed to update property. Are you the owner?");
      });
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 4, p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}
      >
        <Typography component="h1" variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Edit Property
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        <TextField
          label="Property Title"
          margin="normal"
          required
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* ... (Add the other fields: City, Price, Type, Availability) ... */}
        {/* (This form is identical to AddPropertyPage, just copy/paste) */}

        <TextField
          label="City"
          margin="normal"
          required
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="Price (per month)"
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
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default EditPropertyPage;
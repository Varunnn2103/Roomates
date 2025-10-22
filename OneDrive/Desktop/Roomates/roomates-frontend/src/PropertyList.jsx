import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import MUI components
import { 
  Grid, Card, CardContent, Typography, Chip, 
  TextField, Button, Box, CircularProgress
} from '@mui/material';

// --- NEW PropertyCard Component ---
const PropertyCard = ({ property }) => {
  return (
    // A Grid item that takes up 1, 2, or 3 columns
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', transition: '0.2s', '&:hover': { boxShadow: 6 } }}>
        {property.imageUrl ? (
          <img 
            src={property.imageUrl} 
            alt={property.title} 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        ) : (
          // A placeholder if no image
          <Box sx={{ height: '200px', bgcolor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">No Image</Typography>
          </Box>
        )}
        <CardContent>
          <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
            {property.title}
          </Typography>

          <Typography color="text.secondary" gutterBottom>
            <strong>City:</strong> {property.city}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            <strong>Price:</strong> ${property.price} / month
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            <strong>Type:</strong> {property.type}
          </Typography>

          <Chip 
            label={property.availability ? 'Available' : 'Currently Taken'}
            color={property.availability ? 'success' : 'error'}
            variant="outlined"
            sx={{ mt: 2 }} // mt: 2 is margin-top
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

// --- UPDATED PropertyList Component ---
const PropertyList = () => {
  // ... (Your useState and fetch functions are all still perfect, no changes) ...
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchAllProperties = () => {
    setLoading(true);
    axios.get('https://roomatefinder-phhh.onrender.com/api/properties')
      .then(response => {
        setProperties(response.data);
        setLoading(false);
      })
      .catch(error => { console.error(error); setLoading(false); });
  };

  useEffect(() => { fetchAllProperties(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(`https://roomatefinder-phhh.onrender.com/api/properties/search`, {
      params: { city: city, maxPrice: maxPrice }
    })
    .then(response => {
      setProperties(response.data);
      setLoading(false);
    })
    .catch(error => { console.error(error); setLoading(false); });
  };

  return (
    <Box>
      {/* --- NEW Search Form Card --- */}
      <Box 
        component="form" 
        onSubmit={handleSearch}
        sx={{ 
          p: 3, 
          bgcolor: 'background.paper', 
          borderRadius: 2, 
          boxShadow: 1, 
          mb: 4,
          display: 'flex',
          gap: 2
        }}
      >
        <TextField
          label="City (e.g., Mumbai)"
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="Max Price (e.g., 20000)"
          variant="outlined"
          type="number"
          fullWidth
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <Button 
          type="submit"
          variant="contained" 
          size="large"
          sx={{ px: 5 }} // Extra horizontal padding
        >
          Search
        </Button>
      </Box>

      <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
        Available Properties
      </Typography>

      {/* --- NEW Responsive Grid --- */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress /> {/* Loading spinner */}
        </Box>
      ) : properties.length === 0 ? (
        <Typography>No properties found matching your criteria.</Typography>
      ) : (
        <Grid container spacing={3}>
          {properties.map(prop => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PropertyList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Button, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageUploader from './ImageUploader'; // <-- Import

// We can reuse the PropertyCard!
// But let's add Edit/Delete buttons
const ManageablePropertyCard = ({ property, onDelete, onUpdate }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      // Because of our AuthContext, Axios will send the token
      axios.delete(`https://roomatefinder-phhh.onrender.com/api/properties/${property.id}`)
        .then(() => {
          onDelete(property.id); // Tell the parent to remove this card
        })
        .catch(err => console.error("Error deleting property:", err));
    }
  };
  const handleUploadSuccess = (updatedProperty) => {
    // This will refresh the card with the new image URL
    onUpdate(updatedProperty);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, height: '100%' }}>
        {property.imageUrl && (
          <img 
            src={property.imageUrl} 
            alt={property.title} 
            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }}
          />
        )}

        <Typography variant="h6" fontWeight="bold">{property.title}</Typography>
        {/* ... (city, price, etc.) ... */}
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}></Box>
        <Typography variant="h6" fontWeight="bold">{property.title}</Typography>
        <Typography>City: {property.city}</Typography>
        <Typography>Price: ${property.price}</Typography>
        <Typography>Type: {property.type}</Typography>
        <Typography color={property.availability ? 'green' : 'red'}>
          {property.availability ? 'Available' : 'Taken'}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => navigate(`/edit-property/${property.id}`)} // We will build this page next
          >
            Edit
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            size="small" 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
        {/* --- ADD THIS --- */}
        <ImageUploader 
          propertyId={property.id} 
          onUploadSuccess={handleUploadSuccess} 
        />
      </Box>
    </Grid>
  );
};

const MyPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AuthContext automatically adds the token
    axios.get('https://roomatefinder-phhh.onrender.com/api/properties/my-properties')
      .then(response => {
        setProperties(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties. Are you logged in?");
        setLoading(false);
      });
  }, []);

  // This function is passed to the card
  const handlePropertyDelete = (deletedId) => {
    setProperties(prevProperties => 
      prevProperties.filter(prop => prop.id !== deletedId)
    );
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  const handlePropertyUpdate = (updatedProperty) => {
    // Find the property in the list and update it
    setProperties(prevProperties =>
      prevProperties.map(prop =>
        prop.id === updatedProperty.id ? updatedProperty : prop
      )
    );
  };

  return (
    <Box>
      <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
        My Properties
      </Typography>
      {properties.length === 0 ? (
        <Typography>You have not posted any properties yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {properties.map(prop => (
            <ManageablePropertyCard 
              key={prop.id} 
              property={prop}
              onDelete={handlePropertyDelete} 
              onUpdate={handlePropertyUpdate}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyPropertiesPage;

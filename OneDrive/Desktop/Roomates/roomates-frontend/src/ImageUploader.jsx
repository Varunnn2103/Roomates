import React, { useState } from 'react';
import axios from 'axios';
import { Button, Box, Alert } from '@mui/material';

const ImageUploader = ({ propertyId, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    // Axios will send this as multipart/form-data
    // Auth token is automatically attached
    axios.post(`https://roomatefinder-phhh.onrender.com/api/upload/property/${propertyId}`, formData)
      .then(response => {
        // Tell the parent component the upload was a success
        onUploadSuccess(response.data); 
      })
      .catch(err => {
        console.error("Image upload error:", err);
        setError("Image upload failed.");
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        style={{ display: 'block', marginBottom: '8px' }}
      />
      <Button type="submit" variant="contained" size="small">
        Upload Image
      </Button>
      {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
    </Box>
  );
};

export default ImageUploader;

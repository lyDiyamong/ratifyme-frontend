import { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress, Alert, TextField } from '@mui/material';
import axios from 'axios';

const ImageUpload = () => { 
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('http://localhost:2004/api/v1/users/upload-profile-image/18');
        if (response.status === 200) {
          setImageUrl(response.data.data.profileImage);
          console.log(response.data.data.profileImage);
        } 
      } catch (err) {
        console.error(err);
        setError('Failed to fetch existing image.');
      }
    };

    fetchImage();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError('Please enter your username.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    if (file) formData.append('image', file);

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:2004/api/v1/users/upload-profile-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setSuccess('Profile submitted successfully!');
        setUsername('');
        setFile(null);
        setImageUrl(response.data.data.profileImage); // Update with new image URL
      } else {
        setError('Failed to submit profile.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to submit profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      {/* Display existing image */}
      {imageUrl && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">Existing Image:</Typography>
          <img
            src={imageUrl}
            alt="Existing"
            style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }}
          />
        </Box>
      )}

      <Typography variant="h4" gutterBottom>
        Upload New Profile Image
      </Typography>

      {/* Input Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span">
            {file ? 'Change Image' : 'Choose Image'}
          </Button>
        </label>

        {file && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Selected file: {file.name}</Typography>
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
    </Box>
  );
};

export default ImageUpload;

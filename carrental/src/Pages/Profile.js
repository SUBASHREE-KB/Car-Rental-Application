
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, IconButton, Card, CardContent, AppBar, Toolbar, Button } from '@mui/material';
import { Person, Phone, Email, Home } from '@mui/icons-material';
import axios from '../setupAxios';
import {useNavigate} from 'react-router-dom';
 
const MyProfile = () => {
  const [profile, setProfile] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(true);
  const navigate =useNavigate();
  const token = localStorage.getItem('token');
  const role = JSON.parse(atob(token.split(".")[1])).role;
     
  const handleNavigate =()=>{
    if (role === "Admin") {
      navigate("/Admindb");
    } else if (role === "customer") {
      navigate("/Customerdb");
    } else if (role === "agency") {
      navigate("/agencydb");
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/user');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data', error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchProfile();
  }, []);
 
  if (loading) {
    return <Typography>Loading...</Typography>;
  }
 
  return (
    <div
      style={{
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://i.gaw.to/vehicles/photos/08/49/084974_2018_lincoln_Continental.jpg?1024x640)',
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: '#022859' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home" href="/">
            <Home />
          </IconButton>
          <Button color="inherit" onClick={handleNavigate}>Home</Button>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="sm"
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 4,
        }}
      >
        <Card sx={{ width: '100%', backgroundColor: '#022859c8', color: 'white' }}>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom sx={{ textAlign: 'center' }}>
              MY PROFILE
            </Typography>
            <Box display="flex" alignItems="center" mb={2} sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
              <IconButton sx={{ color: '#022859' }}>
                <Person />
              </IconButton>
              <Typography variant="h6" sx={{ color: 'black', ml: 1 }}>{profile.username}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2} sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
              <IconButton sx={{ color: '#022859' }}>
                <Phone />
              </IconButton>
              <Typography variant="h6" sx={{ color: 'black', ml: 1 }}>{profile.phoneNumber}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
              <IconButton sx={{ color: '#022859' }}>
                <Email />
              </IconButton>
              <Typography variant="h6" sx={{ color: 'black', ml: 1 }}>{profile.email}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};
 
export default MyProfile;
 
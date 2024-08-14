import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Grid, AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Logo from './images/flogo.png';
import pic1 from './images/pic.jpg';
import pic2 from './images/pic2.jpeg';
import pic3 from './images/pic3.png';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // handle logout
    console.log('Logout');
  };

  const LogoImage = styled('img')({
    height: '100px',
    width: '200px',
    padding: '10px',
    marginRight: '10px',
  });

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#022859' }}>
        <Toolbar>
          <LogoImage src={Logo} />
          <Button
            style={{ marginLeft: 'auto' }}
            color="inherit"
            startIcon={<HomeIcon />}
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            color="inherit"
            startIcon={<InfoIcon />}
            component={Link}
            to="/about"
          >
            About Us
          </Button>
          <Button
            style={{ marginLeft: '10px', marginRight: '20px' }}
            color="inherit"
            startIcon={<ContactMailIcon />}
            component={Link}
            to="/contact"
          >
            Contact Us
          </Button>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        id="primary-search-account-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to="/my-profile">
          <PersonIcon />My Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon />Logout
        </MenuItem>
      </Menu>
      <Container maxWidth="lg" sx={{ mt: 12 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <img src={pic1} alt="About Us" style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body1">
                Welcome to RIDE-IT RENTALS! At Ride It Rentals, we believe that your journey should be as enjoyable as your destination.
                Founded with the mission to provide top-notch car rental services, we strive to offer our customers the best experience in terms of quality, comfort, and reliability.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Our Story
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                Ride It Rentals started with a vision to revolutionize the car rental industry by making it more customer-centric.
                We understand the challenges and hassles often associated with renting a vehicle, and we are here to change that narrative.
                With a focus on exceptional customer service and a diverse fleet of vehicles, we aim to cater to all your travel needs, whether it's for business or leisure.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src={pic2} alt="Our Story" style={{ width: '100%' }} />
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Why Choose Us?
          </Typography>
          <Typography variant="body1">
            Quality Service: We are committed to providing our customers with the highest level of service. Our team is dedicated to ensuring your rental experience is seamless and enjoyable.
            <br />
            Affordable Rates: We offer competitive pricing without compromising on quality. Our transparent pricing policy means no hidden fees or surprises.
            <br />
            Convenience: With an easy online booking system, flexible rental periods, and convenient pick-up and drop-off locations, renting a car has never been easier.
            <br />
            Customer Support: Our customer support team is available 24/7 to assist you with any queries or issues. Your satisfaction is our priority.
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Our Commitment
          </Typography>
          <Typography variant="body1">
            At Ride It Rentals, we are committed to sustainability and community. We constantly seek ways to reduce our environmental impact by incorporating eco-friendly practices and promoting green driving habits.
            Additionally, we actively participate in community initiatives and support local businesses.
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Reviews
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <img src={pic3} alt="Reviews" style={{ width: '100%', maxWidth: '400px' }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating name="read-only" value={5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              John D.
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            "Ride It Rentals made my business trip to the city stress-free. The car was in perfect condition, and the service was impeccable.
            I highly recommend them for anyone needing a reliable car rental service."
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating name="read-only" value={5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Sarah L.
            </Typography>
          </Box>
          <Typography variant="body1">
            "I rented an SUV for a family vacation, and it was the best decision! The vehicle was spacious, clean, and very comfortable.
            The booking process was straightforward, and the staff was extremely helpful. We'll definitely be using Ride It Rentals again!"
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating name="read-only" value={5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Emma W.
            </Typography>
          </Box>
          <Typography variant="body1">
            "I had an excellent experience with Ride It Rentals. The car was ready on time, the paperwork was minimal, and the staff was friendly and efficient.
            Plus, the rates were very reasonable. I'll be renting from them again for my next trip."
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating name="read-only" value={5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              David K
            </Typography>
          </Box>
          <Typography variant="body1">
            "Ride It Rentals exceeded my expectations. The vehicle was spotless and drove like a dream.
            The customer service team was always available to answer my questions, and the entire process was smooth from start to finish. Highly recommend!"
          </Typography>

        </Paper>
      </Container>
    </Box>
  );
};

export default AboutUsPage;

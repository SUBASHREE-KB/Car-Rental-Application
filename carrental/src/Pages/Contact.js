import React, { useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Logo from './images/flogo.png';

const ContactUsPage = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleSendMessage = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (link) => {
    navigate(link);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const LogoImage = styled('img')({
    height: '100px',
    width: '200px',
    padding: '10px',
    marginRight: '10px',
  });

  return (
    <Box
      sx={{
        backgroundImage: 'url(https://example.com/contact-background.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        p: 3,
      }}
    >
      <AppBar position="fixed" sx={{ backgroundColor: '#022859' }}>
        <Toolbar>
          <LogoImage src={Logo} />
          <Button style={{ marginLeft: '950px' }} color="inherit" startIcon={<HomeIcon />} onClick={() => handleClick('/Home')}>Home</Button>
          <Button style={{ marginLeft: '10px' }} color="inherit" startIcon={<InfoIcon />} onClick={() => handleClick('/Aboutus')}>About Us</Button>
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
        <MenuItem onClick={() => handleClick('/my-profile')}><PersonIcon />My Profile </MenuItem>
        <MenuItem onClick={handleLogout}><LogoutIcon />Logout</MenuItem>
      </Menu>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom style={{ marginTop: '70px', color: '#022859', marginBottom: '20px', fontStyle: 'italic' }}>
          Ride-It Rentals
        </Typography>
        <Box display="flex" justifyContent="center">
          <PhoneIcon style={{ color: '#022859' }} />
          <Typography variant="body1" style={{ marginTop: '1px', color: '#022859', marginRight: '40px' }}>
            98501990621
          </Typography>
          <EmailIcon style={{ color: '#022859' }} />
          <Typography variant="body1" style={{ marginTop: '1px', color: '#022859', marginRight: '40px' }}>
            rideit.rentals02@gmail.com
          </Typography>
          <HomeIcon style={{ color: '#022859' }} />
          <Typography variant="body1" style={{ marginTop: '1px', color: '#022859', marginBottom: '70px' }}>
            1234 Main St, Anytown, Chennai
          </Typography>
        </Box>
        <Paper elevation={3} style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', color: 'white', backgroundColor: '#022859', marginBottom: '40px', borderRadius: 20 }}>
          <Box flex={1} mr={2}>
            <TextField
              sx={{ backgroundColor: 'white', borderRadius: 2 }}
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              sx={{ backgroundColor: 'white', borderRadius: 2 }}
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              sx={{ backgroundColor: 'white', borderRadius: 2 }}
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Box>
          <Box flex={1} ml={2}>
            <TextField
              sx={{ backgroundColor: 'white', borderRadius: 2 }}
              label="Your Message"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={7}
            />
          </Box>
        </Paper>
        <Box mt={2} textAlign="center">
          <Button variant="contained" style={{ backgroundColor: '#022859', color: 'white' }} onClick={handleSendMessage}>
            Send Message
          </Button>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Message Sent</DialogTitle>
          <DialogContent>Your message has been sent successfully!</DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">OK</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ContactUsPage;

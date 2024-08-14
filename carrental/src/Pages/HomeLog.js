import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Grid, Typography, Box, Card, CardMedia, CardContent, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Logo from './images/flogo.png';

import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { CardActionArea } from '@mui/material';
import p1 from './images/carsearch.jpg';
import p2 from './images/carselect.jpg';
import p3 from './images/carbook.jpg';
import p4 from './images/carpickup.jpg';
import p5 from './images/carenjoy.jpg';
import p6 from './images/carreturn.jpg';
import { shadows } from '@mui/system';




const Header = styled(Box)({
  backgroundColor: '#022859',
  color: 'white',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const NavBar = styled(Box)({
  display: 'flex',
  gap: '10px',
});

const FeatureCard = ({ image, title }) => (
  <Card sx={{ maxWidth: 300 }}>
    <CardMedia component="img" height="200" image={image} alt={title} />
    <CardContent>
      <Typography variant="h6" component="div">
        {title}
      </Typography>
    </CardContent>
  </Card>
);

const App = () => (
  <div style={{ backgroundColor: '#022859' }}>
    <Header>
      <img src={Logo} alt="Ride-It Rentals Logo" style={{ height: '100px' }} />
      <Typography variant="h3" style={{ marginRight: 40 }}>RIDE-IT RENTALS</Typography>
      <NavBar>
        <Button sx={{
          backgroundColor: "white",
          "&:hover": { backgroundColor: "white" },
          fontSize: 10,
          color: "#022859",
        }} component={Link} to="/login" variant="contained" startIcon={<LogoutIcon />}>
          Login
        </Button>
        <Button sx={{
          backgroundColor: "white",
          "&:hover": { backgroundColor: "white" },
          fontSize: 10,
          color: "#022859",
        }} component={Link} to="/register" variant="contained" startIcon={<ExitToAppIcon />}>
          Register
        </Button>
      </NavBar>
    </Header>
    <Box>
      <img src="https://th.bing.com/th/id/R.71e765dbd6e4dde9849c096802f831d0?rik=GlH7YCQvfDcIng&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2016%2f01%2f256862-car-landscape-vehicle-road.jpg&ehk=kew2Uuq2uK9%2fkvB7SWYZabrBY3m4Y4%2bvPBQMvOXhKws%3d&risl=&pid=ImgRaw&r=0" alt="Car" style={{ width: '100%' }} />
    </Box>
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h5" style={{ color: 'white', fontWeight: 'bold' }}>FEATURED CARS</Typography>
    </Box>
    <Grid container spacing={3} sx={{ justifyContent: 'center', mt: 2, marginTop: 1 }}>
      <Grid item>
        <FeatureCard image="https://tse4.mm.bing.net/th/id/OIP.L_9BO6Rko43LJJZerPIo2gHaFj?w=253&h=190&c=7&r=0&o=5&dpr=1.3&pid=1.7" title="CAPTUR" />
      </Grid>
      <Grid item>
        <FeatureCard image="https://tse1.mm.bing.net/th/id/OIP.oO7sZowg9LJpHVv8w5AMhgHaEm?w=314&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" title="ALTO" />
      </Grid>
      <Grid item>
        <FeatureCard image="https://tse3.mm.bing.net/th/id/OIP.cYvVC7Rb4fJoAjCgmPfGfAHaEK?w=309&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" title="AURA" />
      </Grid>
      <Grid item>
        <FeatureCard image="https://tse1.mm.bing.net/th/id/OIP.GQLcHBv6EyRSl_4VCVg8EgHaEK?w=282&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" title="SELTOS" />
      </Grid>
    </Grid>
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h5" style={{ color: 'white', fontWeight: 'bold', marginTop: 200 }}>WHY CHOOSE US?</Typography>
      <br></br>
      <Grid container spacing={3} sx={{ justifyContent: 'center', mt: 2 }}>
        <VerifiedUserIcon style={{ fontSize: 48, color: 'white', marginTop: -10 }} />
        <Typography style={{ color: 'white' }}>VERIFIED LICENSE</Typography>
        <MonetizationOnIcon style={{ fontSize: 48, color: 'white', marginTop: -10, marginLeft: 20 }} />
        <Typography style={{ color: 'white' }}>BEST PRICE</Typography>
        <CancelIcon style={{ fontSize: 48, color: 'white', marginTop: -10, marginLeft: 20 }} />
        <Typography style={{ color: 'white' }}>FREE CANCELLATION</Typography>
        <AccessTimeIcon style={{ fontSize: 48, color: 'white', marginTop: -10, marginLeft: 20 }} />
        <Typography style={{ color: 'white' }}>24 HOUR SUPPORT</Typography>
        <br></br>
      </Grid>
    </Box>

    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h5" style={{ color: 'white', fontWeight: 'bold', marginTop: 100, marginBottom: "10px", marginLeft: 40 }}>HOW IT WORKS?</Typography>
      <br></br>
      <Card sx={{ maxWidth: 300, marginLeft: 35, boxShadow: "0 9px 5px rgba(184,173,173,0.599)" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            image={p1}
            alt="search car"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Search For a Car
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter locations,dates.
              Browse available vehicles.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 300, marginLeft: 75, marginTop: -29, boxShadow: "0 9px 5px rgba(184,173,173,0.599)" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            image={p2}
            alt="select car"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Choose your Car
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Compare car models, prices and features.
              Filter results to find your ideal car.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 300, marginLeft: 115, marginTop: -29, boxShadow: "0 9px 5px rgba(184,173,173,0.599)" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            image={p3}
            alt="book car"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Book your Car
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter personal details.
              Confirm reservation with secure payment.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 300, marginLeft: 35, marginTop: 3, boxShadow: "0 9px 5px rgba(184,173,173,0.599)" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            image={p4}
            alt="select car"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Pick Up your Car
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Visit the pick-up location.
              Show booking confirmation and ID.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 300, marginLeft: 75, marginTop: -29, boxShadow: "0 9px 5px rgba(184,173,173,0.599)" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            image={p5}
            alt="select car"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Enjoy Your Ride
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Drive away and enjoy.
              Access 24/7 customer support needed.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 300, marginLeft: 115, marginTop: -29, boxShadow: "0 9px 5px rgba(184,173,173,0.599)" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            image={p6}
            alt="select car"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Return the car
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Return the car to the designated location.
              Complete the return process.

            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>



    </Box>


    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Button component={Link}
        to="/contact" variant="contained" sx={{
          backgroundColor: "white",
          "&:hover": { backgroundColor: "white" },
          fontSize: 20,
          color: "#022859", marginTop: 20,
        }}>Contact Us</Button>
    </Box>
    <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
      <Typography variant="body2" style={{ color: 'white', fontWeight: 'bold' }}>
        Follow us on:
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mt: 1 }}>
        <FacebookIcon style={{ color: 'white' }} />
        <InstagramIcon style={{ color: 'white' }} />
        <WhatsAppIcon style={{ color: 'white' }} />
      </Box>
      <Typography variant="body2" style={{ color: 'white', marginTop: '20px' }}>
        &copy; 2024 Ride-It Rentals. All rights reserved.
      </Typography>
    </Box>
  </div>

);

export default App;
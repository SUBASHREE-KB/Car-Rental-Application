import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from '../setupAxios';
import {
  AppBar, Toolbar, IconButton, Menu, MenuItem, TextField, Select, MenuItem as MuiMenuItem, InputLabel, FormControl
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Logo from './images/flogo.png';
import BookIcon from '@mui/icons-material/Book';
import Video1 from './videos/video1.mp4';
import Video2 from './videos/video2.mp4';
import Video3 from './videos/video3.mp4';

const slideVideos = [
  { url: Video1 },
  { url: Video2 },
  { url: Video3 },
];


const LogoutButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 50,
  right: 50,
  backgroundColor: 'orange',
  color: 'black',
  fontWeight: 'bold',
}));

const LogoImage = styled('img')({
  height: '100px',
  width: '200px',
  padding: '10px',
  marginRight: '10px',
});


const getLocationFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    const data = await response.json();

    console.log("Response:", data);

    const city = data.address.city || data.address.town || data.address.village || data.display_name.split(',')[6]|| 'Unknown City';

    let area = data.address.suburb ?   data.address.city_district.split(' ')[2] :data.address.suburb.split(' ')[2] ;

    console.log(data.address.city_district.split(' ')[2]);
    if (!area || area.length === 0 || /\d/.test(area)) {
      area = 'Unknown Area';
    }

    console.log(`Extracted city: ${city}, area: ${area}`);
    return { city, area };
  } catch (error) {
    console.error("Error fetching location from coordinates:", error);
    return { city: 'Unknown City', area: 'Unknown Area' };
  }
};


const Slideshow = () => {
  const navigate = useNavigate();
  const [filterBy, setFilterBy] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({ city: '', area: '' });
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  useEffect(() => {
    const fetchFavoriteCars = async () => {
      setLoadingFavorites(true);
      try {
        const response = await axios.get('/user/favorites');
        setFavoriteCars(response.data);
      } catch (error) {
        console.error("Error fetching favorite cars:", error);
      } finally {
        setLoadingFavorites(false);
      }
    };

    fetchFavoriteCars();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const endpoint = filterBy === 'price'
          ? '/vehicles/getAllSortedByPrice'
          : '/vehicles/getallbyAvailable';
        const response = await axios.get(endpoint);
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [filterBy]);

  useEffect(() => {
    if (filterBy === 'location' && userLocation.city && userLocation.area) {
      const fetchLocationBasedCars = async () => {
        setLoading(true);
        try {
          console.log(userLocation.city + " " + userLocation.area);
          const city = userLocation.city;
          const area = userLocation.area;
          const response = await axios.get(`/vehicles/getallbyLocation/${area}/${city}`);
          setCars(response.data);
        } catch (error) {
          console.error("Error fetching location-based cars:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchLocationBasedCars();
    }
  }, [filterBy, userLocation]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const location = await getLocationFromCoordinates(latitude, longitude);
          setUserLocation(location);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBookNowClick = async (carId, price) => {
    const vehicleId = carId;
    const response = await axios.get(`/vehicles/getVehicleDetails/${vehicleId}`);
    const carDetails = response.data[0];
    console.log(carDetails);
    console.log(response.address);
    navigate('/Booknow', { state: { CarID: carId, perdayprice: price, image: carDetails.imageLink, type: carDetails.type, model: carDetails.model, aname: carDetails.username, phoneno: carDetails.phoneNumber, address: carDetails.address } });
  };

 

  const filteredCars = cars
  .filter(car => {
    if (filterBy === 'available') {
      return car.availability > 0 && car.model.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (filterBy === 'price') {
      return car.price.toString().includes(searchTerm);
    }
    
    console.log(car.type);
    return car.model.toLowerCase().includes(searchTerm.toLowerCase());
  });

    

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '500px',
    width: '800px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: "#DAC0A3" }}>
      <h1 style={{ color: '#022859', fontStyle: 'italic' }}>Welcome to Ride-It Rentals!</h1>
      <div className="slide-container" style={{ width: '100%', maxWidth: '800px', height: '500px' }}>
        <Slide>
          {slideVideos.map((slideVideo, index) => (
            <div key={index}>
              <div style={divStyle}>
                <video
                  src={slideVideo.url}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  autoPlay
                  loop
                  muted
                />
              </div>
            </div>
          ))}
        </Slide>


      </div>

      <div style={{ marginTop: '50px', width: '100%', maxWidth: '1200px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <FormControl variant="outlined" style={{ marginRight: '10px', minWidth: '150px' }}>
            <InputLabel>Filter By</InputLabel>
            <Select
              value={filterBy}
              onChange={handleFilterChange}
              label="Filter By"
            >
              <MuiMenuItem value="available">Available</MuiMenuItem>
              <MuiMenuItem value="location">Location</MuiMenuItem>
              <MuiMenuItem value="price">Price</MuiMenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '300px' }}
          />
        </div>
        <h2 style={{ color: '#022859' }}>Available Cars</h2>
        {loading ? (
          <p>Loading cars...</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {filteredCars.length === 0 ? (
              <p>No cars available</p>
            ) : (
              filteredCars.map(car => (
                <div
                  key={car.vehicleId}
                  style={{
                    margin: '10px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    maxWidth: '250px',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)' },
                    backgroundColor: "white"
                  }}
                >
                  <img
                    src={car.imageLink}
                    alt={car.model}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '5px' }}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/200x120?text=Image+Not+Available')}
                  />
                  <h3 style={{ color: '#022859' }}>{car.model}</h3>
                  <p>Type: {car.type}</p>
                  <p>Price: Rs. {car.price}</p>
                  <Button
                    variant="contained"
                    onClick={() => handleBookNowClick(car.vehicleId, car.price)}
                    style={{ backgroundColor: '#022859', color: '#fff' }}
                  >
                    Book Now
                  </Button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div style={{ marginTop: '50px', width: '100%', maxWidth: '1200px', textAlign: 'center' }}>

        <h2 style={{ color: '#022859', marginTop: '50px' }}>My Favorites</h2>
        {loadingFavorites ? (
          <p>Loading favorites...</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {favoriteCars.length === 0 ? (
              <p>No favorite cars</p>
            ) : (
              favoriteCars.map(car => (
                <div
                  key={car.vehicleId}
                  style={{
                    margin: '10px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    maxWidth: '250px',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)' },
                    backgroundColor: "white"

                  }}
                >
                  <img
                    src={car.imageLink}
                    alt={car.model}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '5px' }}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/200x120?text=Image+Not+Available')}
                  />
                  <h3 style={{ color: '#022859' }}>{car.model}</h3>
                  <p>Type: {car.type}</p>
                  <p>Price: Rs. {car.price}</p>
                  <Button
                    variant="contained"
                    onClick={() => handleBookNowClick(car.vehicleId, car.price)}
                    style={{
                      backgroundColor: car.availability === 1 ? '#022859' : '#ccc',
                      color: car.availability === 1 ? '#fff' : '#666',
                    }}
                    disabled={car.availability <= 0}
                  >
                    Book Now
                  </Button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default function ButtonBaseDemo() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (link) => {
    navigate(link);
  };
  const handleBooking = () => {
    navigate('/History');
  };
 
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  const menuId = 'primary-search-account-menu';

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#022859' }}>
        <Toolbar>
          <LogoImage src={Logo} />
          <Button style={{ marginLeft: '800px' }} color="inherit" startIcon={<HomeIcon />} onClick={() => handleClick('/HomeLog')}>Home</Button>
          <Button style={{ marginLeft: '10px' }} color="inherit" startIcon={<InfoIcon />} onClick={() => handleClick('/Aboutus')}>About Us</Button>
          <Button style={{ marginLeft: '10px', marginRight: '20px' }} color="inherit" startIcon={<ContactMailIcon />} onClick={() => handleClick('/Contactus')}>Contact Us</Button>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        id="menu-appbar"
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
        <MenuItem onClick={() => handleClick('/Profile')}><PersonIcon />My Profile </MenuItem>
        <MenuItem onClick={handleBooking}><BookIcon />My Bookings</MenuItem>
        <MenuItem onClick={handleLogout}><LogoutIcon />Logout</MenuItem>
      </Menu>

      <Slideshow />
    </div>
  );
}

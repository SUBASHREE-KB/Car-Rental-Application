
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Button, Typography, Box, ButtonBase, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from '../setupAxios';
import Logo from './images/flogo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AdminCharts from './AdminCharts';


const images = [
  { url: 'https://media.istockphoto.com/id/952958976/vector/business-social.jpg?s=612x612&w=0&k=20&c=f2OdvEMDnwJKdYXViJg7sKq7ZSpm7qzp1eiHtVN6jMs=', title: 'CUSTOMERS', color: 'black', link: '/Display5' },
  { url: 'https://tse2.mm.bing.net/th/id/OIP.csgXVFTpnKByLFSybdUVuAHaFD?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', title: 'CONFIRMED BOOKINGS', color: 'black', link: '/Display6' },
  { url: 'https://assets.entrepreneur.com/content/3x2/1300/20160421123729-car-rental.jpeg', title: 'CARS', color: 'black', link: '/Display7' },
  { url: 'https://images.squarespace-cdn.com/content/v1/57ad8de5ff7c50d12ce76b68/1595429263897-4FY7ZDPHZWGG7DDQQLM1/ke17ZwdGBToddI8pDm48kOggE0Ch6pMGalwtLMqzsSB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ufo5RWkg_J4of0jUNHaDHx6pZKBvpVYzidBWCapg0tuoMuEaB2HPGSYDV-11UTcW2g/Engage-285.jpg', title: 'AGENCIES', color: 'black', link: '/Display8' },
  { url: 'https://tse4.mm.bing.net/th/id/OIP.iKIyPhKW5MCQoDGDVnGT_gAAAA?w=239&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', title: 'REVIEWS', color: 'black', link: '/Display9' },
  { url: 'https://media.istockphoto.com/photos/agency-picture-id476802577?k=6&m=476802577&s=612x612&w=0&h=ruTiKwEQQk0j8cfF-AZDoet0XviFIr5MdOh4Xg4nxNU=', title: 'AGENCY VERIFICATION', color: 'black', link: '/AgencyRequestTable' }
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  width: 'calc(30% - 20px)',
  margin: '10px',
  [theme.breakpoints.down('md')]: {
    width: 'calc(33.33% - 20px)',
  },
  [theme.breakpoints.down('sm')]: {
    width: 'calc(50% - 20px)',
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const LogoImage = styled('img')({
  height: '100px',
  width: '200px',
  padding: '10px',
  marginRight: '10px',
});

const CountSpan = styled('span')({
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: '#ffffff',
  borderRadius: '12px',
  padding: '5px 10px',
  fontSize: '16px',
  fontWeight: 'bold',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  zIndex: 2,
});

export default function ButtonBaseDemo() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [counts, setCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('/counts');
        console.log(response.data);
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  const handleClick = (link) => {
    navigate(link);
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontSize: '1.5rem' }}>
            RIDE-IT RENTALS
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <Button color="inherit" startIcon={<HomeIcon />} onClick={() => handleClick('/HomeLog')}>Home</Button>
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
          </Box>
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
        <MenuItem onClick={() => handleClick('/Profile')}><PersonIcon />My Profile</MenuItem>
        <MenuItem onClick={handleLogout}><LogoutIcon />Logout</MenuItem>
      </Menu>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '20px 0' }}>
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            onClick={() => handleClick(image.link)}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: `calc(${image.height} / 10)`,
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
            {counts[image.title.toLowerCase()] && (
              <CountSpan>
                {counts[image.title.toLowerCase()]}
              </CountSpan>
            )}
          </ImageButton>
        ))}
      </Box>
      <AdminCharts />
    </div>
  );
}


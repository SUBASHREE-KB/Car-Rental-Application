import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import carImage from './images/homepage.png';

const Background = styled(Box)({
  backgroundColor: '#022859',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
});

const WelcomeText = styled(Typography)({
  color: '#FFF',
});

const ButtonStyled = styled(Button)({
  backgroundColor: '#D9D9D9',
  color: '#000',
  margin: '10px',
  minWidth: '150px',
  fontSize: '16px',
  padding: '10px 20px',
  '&:hover': {
    backgroundColor: '#b0b0b0',
  },
});

const ButtonsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '20px',
});

const AnimatedCar = styled('img')({
  position: 'absolute',
  bottom: '20px',
  width: '500px',
  animation: 'moveCar 10s linear infinite',
  '@keyframes moveCar': {
    '0%': { left: '0', transform: 'scaleX(1)' },
    '50%': { left: 'calc(100% - 500px)', transform: 'scaleX(1)' },
    '50.01%': { transform: 'scaleX(-1)' },
    '100%': { left: '0', transform: 'scaleX(-1)' },
  },
});

const RideText = styled(Typography)({
  position: 'absolute',
  bottom: '80px',
  left: '50%',
  transform: 'translateX(-50%)',
  color: '#FFF',
  fontSize: '4rem',
  animation: 'fadeInText 5s linear infinite',
  '@keyframes fadeInText': {
    '0%': { opacity: 0 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
});

const HomePage = () => {
  const textRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      const text = 'RIDE-IT RENTALS';
      let index = 0;

      const interval = setInterval(() => {
        textElement.textContent = text.slice(0, index + 1);
        index++;
        if (index === text.length) {
          clearInterval(interval);
        }
      }, 200);
    }
  }, []);

  return (
    <Background>
      <WelcomeText variant="h3">
        WELCOME!
      </WelcomeText>
      <center><h2 style={{ color: 'white' }}>Explore Without Limits - Our Cars, Your Freedom</h2></center>
      <ButtonsContainer>
        <ButtonStyled variant="contained" style={{ color: '#022859', backgroundColor: 'white', fontWeight: 'bolder' }} onClick={() => navigate('/Home')}>Get Started</ButtonStyled>

      </ButtonsContainer>
      <RideText ref={textRef} variant="h4" />
      <AnimatedCar src={carImage} alt="Car" />
    </Background>
  );
};

export default HomePage;
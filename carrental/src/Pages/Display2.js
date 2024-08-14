import React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from '../setupAxios';

const VehicleTable = () => {
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/booking/detailsagency");
        setAllBookings(response.data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#022859' }}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {allBookings.length === 0 ? (
          <h3 style={{ color: 'white' }}>No Bookings yet</h3>
        ) : (
          <TableContainer component={Paper}>
            <h2>BOOKINGS</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No.</TableCell>
                  <TableCell>Vehicle</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Pick Up Date</TableCell>
                  <TableCell>Return Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allBookings.map((booking, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img src={booking.imageLink} alt={booking.model} style={{ width: '200px' }} />
                    </TableCell>
                    <TableCell>{booking.model}</TableCell>
                    <TableCell>{booking.type}</TableCell>
                    <TableCell>{booking.username}</TableCell>
                    <TableCell>{booking.phoneNumber}</TableCell>
                    <TableCell>{booking.pickUpDate}</TableCell>
                    <TableCell>{booking.returnDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default VehicleTable;

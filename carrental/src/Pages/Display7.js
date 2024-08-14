import React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from '../setupAxios';

const VehicleTable = () => {
  const [allVehicles, setAllVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("/vehicles/getall");
        setAllVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div style={{ backgroundColor: '#022859' }}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {allVehicles.length === 0 ? (
          <h3 style={{ color: 'white' }}>No Vehicles registered</h3>
        ) : (
          <TableContainer component={Paper}>
            <h2>REGISTERED VEHICLES</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vehicle Id</TableCell>
                  <TableCell>Image Link</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Availability</TableCell>
                  <TableCell>Agency Name</TableCell>
                  <TableCell>Phone Number</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {allVehicles.map((vehicle, index) => (
                  <TableRow key={index}>
                    <TableCell>{vehicle.vehicleId}</TableCell>
                    <TableCell>
                      <img src={vehicle.imageLink} alt={vehicle.model} style={{ width: '200px' }} />
                    </TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.price}</TableCell>
                    <TableCell>{(vehicle.availability === 1 && vehicle.availability !== -1) ? "YES" : "NO"}</TableCell>
                    <TableCell>{vehicle.username}</TableCell>
                    <TableCell>{vehicle.phoneNumber}</TableCell>
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

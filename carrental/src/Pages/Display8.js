import React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from '../setupAxios'; 

const CustomerTable = () => {
  const [allCustomers, setAllCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get("/agencydetails");
        setAllCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, []);

  return (
    <div style={{ backgroundColor: '#022859', height: '900px', width: 'auto' }}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {allCustomers.length === 0 ? (
          <h3 style={{ color: 'white' }}>No agencies registered</h3>
        ) : (
          <TableContainer component={Paper}>
            <h2>REGISTERED AGENCY DETAILS</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Agency Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Area</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Zip</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCustomers.map((agency, index) => (
                  <TableRow key={index}>
                    <TableCell>{agency.username}</TableCell>
                    <TableCell>{agency.email}</TableCell>
                    <TableCell>{agency.phoneNumber}</TableCell>
                    <TableCell>{agency.area}</TableCell>
                    <TableCell>{agency.city}</TableCell>
                    <TableCell>{agency.zip}</TableCell>
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

export default CustomerTable;

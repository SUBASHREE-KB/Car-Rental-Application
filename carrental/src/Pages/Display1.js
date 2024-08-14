import React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from '../setupAxios';

const CustomerTable = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/customerdetailsbyagency");
        console.log("Response data:", response.data);
        setAllCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#022859', height: '900px', width: 'auto' }}>
      <div style={{ padding: '20px', textAlign: 'center' }}>{allCustomers.length === 0 ? (
        <h3 style={{ color: "white" }}>No customers registered</h3>
      ) : (
        <TableContainer component={Paper}>
          <h2>REGISTERED CUSTOMER DETAILS</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {allCustomers.map((users, index) => (
                <TableRow key={index}>
                  <TableCell>{users.username}</TableCell>
                  <TableCell>{users.email}</TableCell>
                  <TableCell>{users.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>)}
      </div>
    </div>
  );
};

export default CustomerTable;

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import axios from 'axios';

const AgencyRequestTable = () => {
  const [agencyRequests, setAgencyRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/agency/requestpending');
        setAgencyRequests(response.data);
      } catch (error) {
        console.error('Error fetching agency requests:', error);
      }
    };

    fetchData();
  }, []);

  const handleAccept = async (request) => {
    try {

      await axios.post('http://localhost:8080/user/register', {
        role: 'agency',
        phoneNumber: request.phoneNumber,
        username: request.username,
        email: request.email,
        password: request.password,
        area: request.area,
        city: request.city,
        zip: request.zip,
      });
      alert('Agency approved and registered successfully!');
      setAgencyRequests(agencyRequests.filter((req) => req.requestId !== request.requestId));
    } catch (error) {
      console.error('Error registering agency:', error);
      alert('Failed to register agency');
    }
  };

  const handleReject = async (request) => {
    try {
      await axios.post('http://localhost:8080/agency/reject', request);
      alert('Agency rejected successfully!');
      setAgencyRequests(agencyRequests.filter((req) => req.requestId !== request.requestId));
    } catch (error) {
      console.error('Error rejecting agency:', error);
      alert('Failed to reject agency');
    }
  };

  return (
    <div style={{ backgroundColor: '#022859', height: '900px', width: 'auto' }}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {agencyRequests.length === 0 ? (
          <h3 style={{ color: 'white' }}>No Requests Found</h3>
        ) : (
          <TableContainer component={Paper}>
            <h2>Agency Requests</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No.</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Area</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Zip</TableCell>
                  <TableCell>License</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agencyRequests.map((request, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{request.username}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.phoneNumber}</TableCell>
                    <TableCell>{request.area}</TableCell>
                    <TableCell>{request.city}</TableCell>
                    <TableCell>{request.zip}</TableCell>
                    <TableCell>
                      <a
                        href={`data:application/pdf;base64,${request.businessLicense}`}
                        download={`${request.username}_business_license.pdf`}
                      >
                        Download License
                      </a>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{ marginRight: 10, backgroundColor: 'green' }}
                        onClick={() => handleAccept(request)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: 'red' }}
                        onClick={() => handleReject(request)}
                      >
                        Reject
                      </Button>
                    </TableCell>
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

export default AgencyRequestTable;

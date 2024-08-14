import React, { useState, useEffect } from 'react';
import { TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import axios from '../setupAxios';

function Bookingongoing() {
    const [ongoing, setOngoing] = useState([]);
    const [displayCount, setDisplayCount] = useState(5);
    const [showMore, setShowMore] = useState(false);
    const [showLess, setShowLess] = useState(false);

    useEffect(() => {
        axios.get('/track/ongoing')
            .then(response => {
                setOngoing(response.data);
                setShowMore(response.data.length > 5);
                setShowLess(false);
            })
            .catch(error => {
                console.error('There was an error fetching the booking ongoing!', error);
            });
    }, []);

    const handleShowMore = () => {
        setDisplayCount(ongoing.length);
        setShowMore(false);
        setShowLess(true);
    };

    const handleShowLess = () => {
        setDisplayCount(5);
        setShowMore(true);
        setShowLess(false);
    };

    return (
        <div style={{ backgroundColor: '#022859', width: 'auto' }}>
            <TableContainer component={Paper} style={{ marginTop: 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vehicle Model</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Price Per Day</TableCell>
                            <TableCell>Booking Date</TableCell>
                            <TableCell>Pickup Date</TableCell>
                            <TableCell>Return Date</TableCell>
                            <TableCell>Agency</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ongoing.slice(0, displayCount).map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.vehicle.model}</TableCell>
                                <TableCell>{item.vehicle.type}</TableCell>
                                <TableCell>{item.vehicle.price}</TableCell>
                                <TableCell>{new Date(item.booking.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(item.booking.pickUpDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(item.booking.returnDate).toLocaleDateString()}</TableCell>
                                <TableCell>{item.user.username}</TableCell>
                                <TableCell>{item.user.phoneNumber}</TableCell>
                                <TableCell>{item.agencyLocation.city}, {item.agencyLocation.area}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <center>
                    {showMore && (
                        <Button
                            variant="contained"
                            onClick={handleShowMore}
                            style={{ marginTop: '20px', backgroundColor: '#022859', color: 'white' }}
                        >
                            Show More
                        </Button>
                    )}

                </center>
                <center>
                    {showLess && (
                        <Button
                            variant="contained"
                            onClick={handleShowLess}
                            style={{ marginTop: '20px', backgroundColor: '#022859', color: 'white' }}
                        >
                            Show Less
                        </Button>
                    )}
                </center>
                <br />
            </TableContainer>

        </div>
    );
}

export default Bookingongoing;

import React, { useState, useEffect } from 'react';
import { Typography, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from '../setupAxios';
import { useNavigate } from 'react-router-dom';

function Bookingpending() {
    const [pending, setPending] = useState([]);
    const [displayCount, setDisplayCount] = useState(5);
    const [showMore, setShowMore] = useState(false);
    const [showLess, setShowLess] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/track/pending')
            .then(response => {
                setPending(response.data);
                setShowMore(response.data.length > 5);
            })
            .catch(error => {
                console.error('There was an error fetching the pending bookings!', error);
            });
    }, []);

    const handleShowMore = () => {
        setDisplayCount(pending.length);
        setShowMore(false);
        setShowLess(true);
    };

    const handleShowLess = () => {
        setDisplayCount(5);
        setShowMore(true);
        setShowLess(false);
    };

    const handleOpenDialog = (message, booking) => {
        console.log(booking);
        setDialogMessage(message);
        setSelectedBooking(booking);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedBooking(null);
    };

    const handleConfirm = () => {
        if (dialogMessage.includes('cancel')) {
            axios.post(`/booking/cancel/${selectedBooking.bookId}`)
                .then(() => {
                    alert("Your booking is cancelled successfully");
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error canceling booking:', error);
                });
        }
        handleCloseDialog();
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
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pending.slice(0, displayCount).map((item, index) => (
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
                                <TableCell>{item.booking.status}</TableCell>
                                <TableCell>
                                    {item.booking.status === "Pending Payment" ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                style={{ marginRight: 10, backgroundColor: 'green' }}
                                                onClick={() => navigate("/Payment", {
                                                    state: { bookId: item.booking.bookId, calprice: item.booking.price },
                                                })}
                                            >
                                                Pay
                                            </Button>
                                            <Button
                                                variant="contained"
                                                style={{ backgroundColor: 'red' }}
                                                onClick={() => handleOpenDialog('Are you sure you want to cancel booking?', item.booking)}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : item.booking.status === "Booked" ? (
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: 'red' }}
                                            onClick={() => handleOpenDialog('Only 50% of the money will be refunded. Are you sure you want to cancel booking?', item.booking)}
                                        >
                                            Cancel Booking
                                        </Button>
                                    ) : null}
                                </TableCell>
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


            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <Typography>{dialogMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Bookingpending;

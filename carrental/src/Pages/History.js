import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from '../setupAxios';
import OngoingTable from './Ongoing.js';
import OverdueTable from './Overdue.js';
import PendingTable from './PendingBookings.js';
import CancelledTable from './CancelledBookings.js';

function BookingHistory() {
    const [history, setHistory] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [review, setReview] = useState({ rating: '', comment: '' });
    const [displayCount, setDisplayCount] = useState(3);
    const [showMore, setShowMore] = useState(false);
    const [showLess, setShowLess] = useState(false);
    const [favorites, setFavorites] = useState({});

    useEffect(() => {
        axios.get('/track/history')
            .then(response => {
                setHistory(response.data);
                if (response.data.length > 3) {
                    setShowMore(true);
                    setShowLess(false);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the booking history!', error);
            });

        axios.get('/reviews/byuser')
            .then(response => {
                setUserReviews(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching user reviews!', error);
            });
     
        axios.get('/favorites')
            .then(response => {
                console.log(response);
                const favoriteMap = response.data.reduce((acc, item) => {
                    acc[item.vehicleId] = item.flag === 1;
                    return acc;
                }, {});
                setFavorites(favoriteMap);
            })
            .catch(error => {
                console.error('There was an error fetching the favorites list!', error);
            });
    }, []);

    const handleReviewOpen = (booking) => {
        setCurrentBooking(booking);
        setOpen(true);
    };

    const handleReviewClose = () => {
        setOpen(false);
        setCurrentBooking(null);
        setReview({ rating: '', comment: '' });
    };

    const handleReviewSubmit = () => {
        axios.post('/reviews/create', {
            bookId: currentBooking.booking.bookId,
            vehicleId: currentBooking.vehicle.vehicleId,
            rating: review.rating,
            comment: review.comment,
        }).then(() => {
            handleReviewClose();
        }).catch(error => {
            console.error('There was an error submitting the review!', error);
        });
    };

    const handleAddToFavorites = (vehicleId) => {
        axios.post(`/togglefavorite/${vehicleId}`)
            .then(response => {
                setFavorites(prevFavorites => ({
                    ...prevFavorites,
                    [vehicleId]: response.data.flag === 1
                }));
            })
            .catch(error => {
                console.error('There was an error toggling the favorite status!', error);
            });
    };

    const hasReview = (bookId) => {
        return userReviews.some(review => review.bookId === bookId);
    };
    const handleShowMore = () => {
        setDisplayCount(history.length);
        setShowMore(false);
        setShowLess(true);
    };

    const handleShowLess = () => {
        setDisplayCount(3);
        setShowMore(true);
        setShowLess(false);
    };
    return (
        <div style={{ backgroundColor: '#022859', width: 'auto' }}>
            <div style={{ padding: '20px' }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', color: 'white' }}>Booking History</Typography>
                <Grid container spacing={2}>
                    {history.slice(0, displayCount).map((item, index) => (
                        <Grid item xs={16} sm={8} md={6} lg={4} key={index}>
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    padding: '10px',
                                    borderRadius: '12px',
                                    boxShadow: 3,
                                    position: 'relative'
                                }}
                            >
                                <div
                                    style={{
                                        width: '45%',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius: '8px',
                                        marginRight: '10px'
                                    }}
                                >
                                    <img
                                        src={item.vehicle.imageLink}
                                        alt={item.vehicle.model}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'cover',
                                            maxHeight: 200
                                        }}
                                    />
                                    <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.8)' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{item.vehicle.model}</Typography>
                                        <Typography variant="subtitle1">{item.vehicle.type}</Typography>
                                        <Typography variant="body2">Price per day: ₹{item.vehicle.price}</Typography>
                                        <Typography variant="body2">Overdue Fine: ₹{item.tracking.fine}</Typography>
                                    </div>
                                </div>

                                <CardContent sx={{ width: '55%' }}>
                                    <br />
                                    <Typography variant="body2" sx={{ mb: 1 }}>Booking Date: {new Date(item.booking.createdAt).toLocaleDateString()}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Pick Up Date: {new Date(item.booking.pickUpDate).toLocaleDateString()}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Return Date: {new Date(item.booking.returnDate).toLocaleDateString()}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Agency: {item.user.username}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Location: {item.agencyLocation.city}, {item.agencyLocation.area}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Total Amount: ₹{Number(item.booking.price) + Number(item.tracking.fine)}</Typography>
                                    <br />
                                    <center>
                                        <Button
                                            variant="contained"
                                            sx={{ color: 'white', backgroundColor: '#022859', fontWeight: '10', marginLeft: -17 }}
                                            onClick={() => handleReviewOpen(item)}
                                        >
                                            Leave a Review
                                        </Button>
                                    </center>
                                </CardContent>

                                <IconButton
                                    onClick={() => handleAddToFavorites(item.vehicle.vehicleId)}
                                    style={{ color: favorites[item.vehicle.vehicleId] ? 'red' : 'gray' }}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ textAlign: 'right', marginTop: '20px' }}>
                    {showMore && (
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                                borderColor: '#022859',
                                color: 'white',
                                '&:hover': { borderColor: '#022859' },
                                marginRight: '10px'
                            }}
                            onClick={handleShowMore}
                        >
                            Show More
                        </Button>
                    )}
                    {showLess && (
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                                borderColor: '#022859',
                                color: 'white',
                                '&:hover': { borderColor: '#022859' },
                                marginRight: '10px'
                            }}
                            onClick={handleShowLess}
                        >
                            Show Less
                        </Button>
                    )}
                </Box>
                <Dialog open={open} onClose={handleReviewClose}>
                    <DialogTitle>Leave a Review</DialogTitle>
                    <DialogContent>
                        <Typography component="legend">Rating</Typography>
                        <Rating
                            name="rating"
                            value={review.rating}
                            onChange={(event, newValue) => {
                                setReview({ ...review, rating: newValue });
                            }}
                        />
                        <TextField
                            margin="dense"
                            label="Comment"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            value={review.comment}
                            onChange={(e) => setReview({ ...review, comment: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleReviewClose} color="primary">Cancel</Button>
                        <Button onClick={handleReviewSubmit} color="primary">Submit</Button>
                    </DialogActions>
                </Dialog>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', marginTop: 5, color: 'white' }}>Booking Status</Typography>
                <Typography variant="h7" sx={{ mb: 1, fontWeight: 'bold', marginTop: 5, color: 'white' }}>ONGOING BOOKINGS</Typography>
                <OngoingTable />
                <br />
                <Typography variant="h7" sx={{ mb: 1, fontWeight: 'bold', marginTop: 5, color: 'white' }}>OVERDUE BOOKINGS</Typography>
                <OverdueTable />
                <br />
                <Typography variant="h7" sx={{ mb: 1, fontWeight: 'bold', marginTop: 5, color: 'white' }}>PENDING BOOKINGS</Typography>
                <PendingTable />
                <br />
                <Typography variant="h7" sx={{ mb: 1, fontWeight: 'bold', marginTop: 5, color: 'white' }}>CANCELLED BOOKINGS</Typography>
                <CancelledTable />
            </div>
        </div>
    );
}

export default BookingHistory;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from '../setupAxios';
const ReviewDetailsTable = () => {
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axios.get("/reviews/byvehicles");
        setAllReviews(response.data);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchReviewData();
  }, []);
  return (
    <div style={{ backgroundColor: '#022859', height: 'auto', width: '100%' }}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {allReviews.length === 0 ? (
          <h3 style={{ color: 'white' }}>No Reviews available</h3>
        ) : (
          <div>
            <h3 style={{ color: 'white' }}>Reviews</h3>
            {allReviews.map((review, index) => (
              <Card key={index} style={{ marginBottom: '20px' }}>
                <CardContent>
                  <Typography variant="h6" component="h3">
                    {review.model}
                  </Typography>
                  <img src={review.imageLink} alt={`Vehicle ${review.vehicleId}`} style={{ width: '200px' }} />
                  <Typography variant="body2" color="textSecondary">
                    Type: {review.type}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Agency: {review.agency}
                  </Typography>
                  <Typography variant="h6" component="h3">
                    Customer Reviews:
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table style={{ backgroundColor: "#DAC0A3" }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Customer Name</TableCell>
                          <TableCell>Phone Number</TableCell>
                          <TableCell>Rating</TableCell>
                          <TableCell>Comment</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {review.customerReviews.map((customerReview, reviewIndex) => (
                          <TableRow key={reviewIndex}>
                            <TableCell>{customerReview.customerName}</TableCell>
                            <TableCell>{customerReview.phoneNumber}</TableCell>
                            <TableCell>{customerReview.rating}</TableCell>
                            <TableCell>{customerReview.comment}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ReviewDetailsTable;

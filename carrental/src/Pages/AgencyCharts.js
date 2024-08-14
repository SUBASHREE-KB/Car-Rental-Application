import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';

const AgencyCharts = () => {
  const [revenue, setRevenue] = useState(0);
  const [loss, setLoss] = useState(0);
  const [bookingStatusData, setBookingStatusData] = useState({ confirmedCount: 0, cancelledCount: 0 });
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const fetchRevenueLossData = async () => {
      try {
        const response = await axios.get('/track/revenue-loss');

        setRevenue(response.data[0]);
        setLoss(response.data[1])
      } catch (error) {
        console.error('Error fetching agency booking data:', error);
      }
    };

    const fetchBookingStatusData = async () => {
      try {
        const response = await axios.get('/track/booking-status-counts-agency');
        setBookingStatusData(response.data);
      } catch (error) {
        console.error('Error fetching booking status data:', error);
      }
    };

    const fetchBookingData = async () => {
      try {
        const response = await axios.get('/track/count-per-month');
        const data = response.data.map(item => ({
          month: new Date(0, item.month - 1).toLocaleString('default', { month: 'long' }),
          bookings: item.customerCount,
          cancellations: item.agencyCount
        }));
        setBookingData(data);
      } catch (error) {
        console.error('Error fetching Booking data:', error);
      }
    };

    fetchRevenueLossData();
    fetchBookingStatusData();
    fetchBookingData();

  }, []);

  const pieData = [
    { name: 'Confirmed', value: bookingStatusData.confirmedCount },
    { name: 'Cancelled', value: bookingStatusData.cancelledCount },
  ];
  const COLORS = ['#FF8042', '#FFBB28'];
  const data = [
    { name: 'Revenue', average: revenue },
    { name: 'Loss', average: loss },
  ];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }}>
        <Card sx={{ width: '30%', marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Average Revenue and Average Loss
            </Typography>
            <BarChart
              width={400}
              height={300}
              data={data}
              style={{ backgroundColor: "white"}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="average" fill="#82ca9d" />
            </BarChart>
          </CardContent>
        
        </Card>
        <Card sx={{ width: '30%', marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Booking Status
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#FF8042"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
        <Card sx={{ width: '30%', marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Bookings and Cancellations Over Time
            </Typography>
            <LineChart
              width={400}
              height={300}
              data={bookingData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bookings" stroke="#8884d8" name="Bookings" />
              <Line type="monotone" dataKey="cancellations" stroke="#82ca9d" name="Cancellations" />
            </LineChart>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AgencyCharts;
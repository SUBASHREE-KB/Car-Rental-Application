import React, { useEffect, useState } from 'react';
import axios from '../setupAxios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line
} from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';

const AdminDashboard = () => {
  const [agencyBookingData, setAgencyBookingData] = useState([]);
  const [bookingStatusData, setBookingStatusData] = useState({ confirmedCount: 0, cancelledCount: 0 });
  const [radarChartData, setRadarChartData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    const fetchAgencyBookingData = async () => {
      try {
        const response = await axios.get('/track/agency-booking-counts');
        setAgencyBookingData(response.data);
      } catch (error) {
        console.error('Error fetching agency booking data:', error);
      }
    };

    const fetchBookingStatusData = async () => {
      try {
        const response = await axios.get('/track/booking-status-counts');
        setBookingStatusData(response.data);
      } catch (error) {
        console.error('Error fetching booking status data:', error);
      }
    };

    const fetchRadarChartData = async () => {
      try {
        const response = await axios.get('/radar-counts');
        const data = response.data;
        const transformedData = data.map(item => ({
          ...item,
          name: item.agencyName,
          customers: item.customers,
          bookings: item.bookings,
          cars: item.cars,
          trackings: item.trackings
        }));

        let max = 0;
        transformedData.forEach(item => {
          const values = [item.customers, item.bookings, item.cars, item.trackings];
          const localMax = Math.max(...values);
          if (localMax > max) {
            max = localMax;
          }
        });

        setMaxValue(max);
        setRadarChartData(transformedData);
      } catch (error) {
        console.error('Error fetching radar chart data:', error);
      }
    };

    const fetchCustomerData = async () => {
      try {
        const response = await axios.get('/count-per-month');
        const data = response.data.map(item => ({
          month: new Date(0, item.month - 1).toLocaleString('default', { month: 'long' }),
          customers: item.customerCount,
          agencies: item.agencyCount
        }));
        setCustomerData(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchAgencyBookingData();
    fetchBookingStatusData();
    fetchRadarChartData();
    fetchCustomerData();
  }, []);

  const pieData = [
    { name: 'Confirmed', value: bookingStatusData.confirmedCount },
    { name: 'Cancelled', value: bookingStatusData.cancelledCount },
  ];
  const COLORS = ['#FF8042', '#FFBB28'];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }}>
        <Card sx={{ width: '48%', marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Agency Bookings
            </Typography>
            <BarChart
              width={500}
              height={300}
              data={agencyBookingData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="agencyName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookingCount" fill="#82ca9d" />
            </BarChart>
          </CardContent>
        </Card>
        <Card sx={{ width: '48%', marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Booking Status
            </Typography>
            <PieChart width={500} height={300}>
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
        <Card sx={{ width: '48%', marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Agency Comparison
            </Typography>
            <RadarChart
              cx={250}
              cy={200}
              outerRadius={150}
              width={500}
              height={400}
              data={radarChartData}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, maxValue]} />
              <Radar name="Customers" dataKey="customers" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Bookings" dataKey="bookings" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Radar name="Cars" dataKey="cars" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
              <Radar name="Trackings" dataKey="trackings" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </CardContent>
        </Card>
        <Card sx={{ width: '48%', marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Registrations Over Time
            </Typography>
            <LineChart
              width={500}
              height={300}
              data={customerData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="customers" stroke="#8884d8" name="Customers" />
              <Line type="monotone" dataKey="agencies" stroke="#82ca9d" name="Agencies" />
            </LineChart>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard;

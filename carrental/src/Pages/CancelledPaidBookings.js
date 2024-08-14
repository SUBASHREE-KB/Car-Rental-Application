import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from '../setupAxios';

const TrackingTable = () => {
  const [allTracks, setAllTracks] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedTrack, setEditedTrack] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/track/agency/cancelled');
        setAllTracks(response.data);
      } catch (error) {
        console.error('Error fetching tracking data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (track) => {
    setEditedTrack(track);
    setEditDialogOpen(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put('/track/refundstatus', editedTrack);
      const response = await axios.get('/track/agency/cancelled');
      setAllTracks(response.data);
    } catch (error) {
      console.error('Error saving track:', error);
    }
    setEditDialogOpen(false);
  };

  return (
    <div style={{ backgroundColor: '#022859' }}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {allTracks.length === 0 ? (
          <h3 style={{ color: 'white' }}>No cancelled bookings</h3>
        ) : (
          <TableContainer component={Paper}>
            <h2>Cancelled Bookings</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No.</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Vehicle</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Refund Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allTracks.map((track, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell style={{ display: 'none' }}>{track.trackId}</TableCell>
                    <TableCell>{track.username}</TableCell>
                    <TableCell>{track.phoneNumber}</TableCell>
                    <TableCell>{track.email}</TableCell>
                    <TableCell>
                      <img src={track.imageLink} alt={track.model} style={{ width: '200px' }} />
                    </TableCell>
                    <TableCell>{track.type}</TableCell>
                    <TableCell>{track.model}</TableCell>
                    <TableCell>{track.due}</TableCell>
                    <TableCell>{track.fine}</TableCell>
                    <TableCell>{track.status}</TableCell>
                    <TableCell>
                      <IconButton aria-label="Edit" onClick={() => handleEditClick(track)}
                        disabled={track.status === "Refunded"}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Status</DialogTitle>
        <DialogContent>
          <input
            type="hidden"
            value={editedTrack?.trackId || ""}
            onChange={(e) =>
              setEditedTrack({ ...editedTrack, trackId: e.target.value })
            }
          />
          <TextField
            label="Status"
            value={editedTrack?.status || ''}
            onChange={(e) => setEditedTrack({ ...editedTrack, status: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
          <Button
            style={{ color: 'white', backgroundColor: '#022859', marginRight: '10px' }}
            onClick={handleSaveClick}
          >
            Save
          </Button>
          <Button
            style={{ color: 'white', backgroundColor: '#022859' }}
            onClick={() => setEditDialogOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </div>

  );
};

export default TrackingTable;

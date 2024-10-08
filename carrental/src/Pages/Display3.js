import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Input
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../setupAxios";

const VehicleTable = () => {
  const [allVehicles, setAllVehicles] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const handleEditClick = (product) => {
    setEditedProduct(product);
    setSelectedImage(product.imageLink);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteConfirmationOpen(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put("/vehicles/edit", editedProduct);
      const response = await axios.get("/vehicles/getallbyAgency");
      setAllVehicles(response.data);
    } catch (error) {
      console.error("Error saving vehicle:", error);
    }
    setEditedProduct({});
    setSelectedImage(null);
    setEditDialogOpen(false);
  };
  const handleSaveNewClick = async () => {
    try {
      await axios.post("/vehicles/create", editedProduct);
      const response = await axios.get("/vehicles/getallbyAgency");
      setAllVehicles(response.data);
    } catch (error) {
      console.error("Error saving vehicle:", error);
    }
    setEditedProduct({});
    setSelectedImage(null);
    setUploadDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/vehicles/delete/${productToDelete.vehicleId}`);
      setAllVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.vehicleId !== productToDelete.vehicleId)
      );
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
    setDeleteConfirmationOpen(false);
  };


  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setEditedProduct({ ...editedProduct, imageLink: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const handleUploadClick = () => {
    setUploadDialogOpen(true);
  };

  const handleUploadClose = () => {
    setEditedProduct({});
    setSelectedImage(null);
    setUploadDialogOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/vehicles/getallbyAgency");
        setAllVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#022859', width: 'auto' }}>
      <div style={{ padding: "20px", textAlign: "center" }}>
        {allVehicles.length === 0 ? (
          <h3 style={{ color: 'white' }}>No Vehicles registered</h3>
        ) : (
          <TableContainer component={Paper}>
            <h2>REGISTERED VEHICLES</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vehicle Id</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Availability</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allVehicles.map((vehicle) => (
                  <TableRow key={vehicle.vehicleId}>
                    <TableCell>{vehicle.vehicleId}</TableCell>
                    <TableCell>
                      <img
                        src={vehicle.imageLink}
                        alt={vehicle.model}
                        style={{ width: "200px" }}
                      />
                    </TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.price}</TableCell>
                    <TableCell>
                      {vehicle.availability === 1 ? "YES" : "NO"}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="Edit"
                        onClick={() => handleEditClick(vehicle)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="Delete"
                        onClick={() => handleDeleteClick(vehicle)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

      </div>
      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Do you want to delete this item?</DialogContent>
        <Button onClick={handleDeleteConfirm}>Yes</Button>
        <Button onClick={handleDeleteCancel}>No</Button>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <center>
          <DialogTitle style={{ color: "#022859" }}>EDIT VEHICLE</DialogTitle>
        </center>
        <DialogContent>
          <input
            type="hidden"
            value={editedProduct?.vehicleId || ""}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, vehicleId: e.target.value })
            }
          />

          <label htmlFor="image-upload">Image</label>
          <Input
            id="image-upload"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            fullWidth
            margin="normal"
          />
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ width: "100%", marginTop: "10px" }}
            />
          )}

          <TextField
            label="Model"
            value={editedProduct?.model || ""}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, model: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Type"
            value={editedProduct?.type || ""}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, type: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={editedProduct?.price || ""}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, price: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Availability"
            value={editedProduct?.availability || ""}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                availability: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <div
          style={{
            display: "flex",
            marginLeft: "200px",
            marginRight: "200px",
            padding: 20,
          }}
        >
          <Button
            style={{
              color: "white",
              backgroundColor: "#022859",
              marginRight: "50px",
            }}
            onClick={handleSaveClick}
          >
            SAVE
          </Button>
          <Button
            style={{ color: "white", backgroundColor: "#022859" }}
            onClick={() => setEditDialogOpen(false)}
          >
            CANCEL
          </Button>
        </div>
      </Dialog>
      <Dialog open={uploadDialogOpen} onClose={handleUploadClose}>
        <center>
          <DialogTitle style={{ color: '#022859' }}>UPLOAD PRODUCT</DialogTitle>
        </center>
        <DialogContent>
          <label htmlFor="upload-image-upload">Image</label>
          <Input
            id="upload-image-upload"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            fullWidth
            margin="normal"
          />
          {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: '100%', marginTop: '10px' }} />}

          <TextField
            label="Model"
            value={editedProduct?.model || ''}
            onChange={(e) => setEditedProduct({ ...editedProduct, model: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Type"
            value={editedProduct?.type || ''}
            onChange={(e) => setEditedProduct({ ...editedProduct, type: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={editedProduct?.price || ''}
            onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Availability"
            value={editedProduct?.availability || ''}
            onChange={(e) => setEditedProduct({ ...editedProduct, availability: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <div style={{ display: 'flex', marginLeft: '200px', marginRight: '200px', padding: 20 }}>
          <Button style={{ color: 'white', backgroundColor: '#022859', marginRight: '50px' }} onClick={handleSaveNewClick}>UPLOAD</Button>
          <Button style={{ color: 'white', backgroundColor: '#022859' }} onClick={handleUploadClose}>CANCEL</Button>
        </div>
      </Dialog>
      <center>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: 'white' }, fontWeight: 'bold', fontSize: 16, color: '#022859', marginTop: '20px' }}
          onClick={handleUploadClick}
        >
          UPLOAD
        </Button>
      </center>
      <br />
      <br />


    </div>
  );
};

export default VehicleTable;

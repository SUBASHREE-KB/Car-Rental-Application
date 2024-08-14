import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  DialogContent,
  DialogActions,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../setupAxios.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import gifImage from './images/anim2.gif';

const BackgroundOverlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.gaw.to/vehicles/photos/08/49/084974_2018_lincoln_Continental.jpg?1024x640')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: -1,
});
const CustomDatePicker = styled(DatePicker)({
  "& .MuiPickersToolbar-root": {
    backgroundColor: "#e9e6f1c9",
  },
  "& .MuiButtonBase-root": {
    color: "#022859",
  },
});
const StyledPaper = styled(Paper)({
  padding: 25,
  backgroundColor: "#e9e6f1c9",
  color: '#022859',
  position: "relative",
  zIndex: 1,
  maxWidth: "600px",
  margin: "auto",
});
const StyledTextField = styled(TextField)({
  marginBottom: "16px",
  "& .MuiInputBase-root": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "#022859",
    fontWeight: "bold", 
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#022859",
    },
    "&:hover fieldset": {
      borderColor: "#022859",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#022859",
    },
  },
});

function Paymentform() {
  const [cardHolderName, setName] = useState("");
  const [cardNo, setCardNumber] = useState("");
  const [expirationDate, setExpDate] = useState(null);
  const [cvv, setCvv] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [cardType, setCardType] = useState("Credit Card");
  const location = useLocation();
  const amount = location.state.calprice;
  const bookId = location.state.bookId;

  const handleCloseDialog = () => {
    navigate("/CustomerDB");
    setOpenDialog(false);
  };

  const handleExpiryDateChange = (date) => {
    setExpDate(date);
  };

  const handlePay = () => {
    const newErrors = {};

    if (!cardHolderName) newErrors.cardHolderName = "Card holder name is required";
    if (!cardNo) newErrors.cardNo = "Card number is required";
    if (!expirationDate) newErrors.expirationDate = "Expiration date is required";
    if (!cvv) newErrors.cvv = "CVV is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const makepayment = async () => {
      try {
        const response = await axios.post("/payments/proceedpay", {
          bookId,
          cardType,
          cardHolderName,
          cardNo,
          expirationDate,
          cvv,
          amount,
        });
        setOpenDialog(true);
        return response.data;
      } catch (error) {
        console.error("Error processing payment:", error);
        return null;
      }
    };

    makepayment();
  };

  const renderF = () => {
    return (
      <>
        <Grid item xs={8}>
          <TextField
            label="Name"
            fullWidth
            variant="filled"
            value={cardHolderName}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.cardHolderName}
            helperText={errors.cardHolderName}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            label="Card Number"
            fullWidth
            variant="filled"
            value={cardNo}
            onChange={(e) => setCardNumber(e.target.value)}
            error={!!errors.cardNo}
            helperText={errors.cardNo}
          />
        </Grid>
        <Grid item xs={8}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
              <CustomDatePicker
                label="Expiry Date"
                value={expirationDate}
                onChange={handleExpiryDateChange}
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    fullWidth
                    error={!!errors.expirationDate}
                    helperText={errors.expirationDate}
                  />
                )}
              />
            </div>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={8}>
          <TextField
            label="CVV"
            fullWidth
            type="password"
            variant="filled"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            error={!!errors.cvv}
            helperText={errors.cvv}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            label="Amount"
            fullWidth
            variant="filled"
            value={amount}
            disabled
          />
        </Grid>
      </>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <BackgroundOverlay />
      <StyledPaper elevation={3}>
        <center>
          <h2 style={{ color: "#022859" }}>PAYMENT</h2>
        </center>
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
          <Grid item xs={12}>
            <center>
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  sx={{ color: "#022859", "&:hover": { color: "#022859" } }}
                >
                  SELECT PAYMENT METHOD
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="role"
                  name="role"
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                >
                  <FormControlLabel value="Credit Card" control={<Radio />} label="Credit Card" />
                  <FormControlLabel value="Debit Card" control={<Radio />} label="Debit Card" />
                </RadioGroup>
              </FormControl>
            </center>
          </Grid>
          {renderF()}
          <Grid item xs={12}>
            <center>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#022859",
                  "&:hover": { backgroundColor: "#022859" },
                  fontSize: 20,
                  color: "white",
                  marginRight: 2,
                }}
                onClick={handlePay}
              >
                PAY
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#022859",
                  "&:hover": { backgroundColor: "#022859" },
                  fontSize: 20,
                  color: "white",
                }}
                onClick={() => navigate("/CustomerDB")}
              >
                CANCEL
              </Button>
            </center>
          </Grid>
        </Grid>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="payment-success-dialog"
        >
          <DialogTitle id="payment-success-dialog">
            <Typography variant="h6" sx={{ color: "#022859" }}>Payment Successful</Typography>
          </DialogTitle>
          <DialogContent>

            <Typography variant="body1" sx={{ color: "#022859" }}>
              Your payment was processed successfully.
            </Typography>
            <img src={gifImage} alt="Success Animation" style={{ width: '100%', marginTop: '10px' }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </StyledPaper>
    </div>
  );
}

export default Paymentform;


import * as React from "react";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import axios from "../setupAxios";

const BackgroundOverlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage:
    'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://i.gaw.to/vehicles/photos/08/49/084974_2018_lincoln_Continental.jpg?1024x640")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: -1,
});

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  position: "relative",
  padding: "50px",
  flexDirection: "column",
});

const CardContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "1100px",
  backgroundColor: "#e9e6f1c9",
  padding: "20px",
  borderRadius: "8px",
});

const StyledCard = styled(Card)({
  minWidth: 275,
  maxWidth: 500,
  padding: "40px",
  backgroundColor: "#e9e6f1c9",
  position: "relative",
  margin: "20px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const DetailsCard = styled(Card)({
  minWidth: 275,
  maxWidth: 500,
  padding: "40px",
  backgroundColor: "#e9e6f1c9",
  position: "relative",
  margin: "20px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
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

const BoldButton = styled(Button)({
  fontSize: "15px",
  padding: "10px 20px",
  borderRadius: "5px",
  marginTop: "30px",
  height: 40,
  backgroundColor: "#022859",
  color: "white",
  fontWeight: "bold",
});

const CustomDatePicker = styled(DatePicker)({
  "& .MuiPickersToolbar-root": {
    backgroundColor: "#e9e6f1c9",
  },
  "& .MuiButtonBase-root": {
    color: "#022859",
  },
});

export default function BookingForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pickUpDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const vehicleId = location.state?.CarID;
  const price = location.state?.perdayprice;
  const image = location.state?.image
  const type = location.state?.type;
  const model = location.state?.model;
  const address = location.state?.address;
  const agency = location.state?.aname;
  const phoneno = location.state?.phoneno;

  const calculatePrice = () => {
    if (!pickUpDate || !returnDate) return 0;
    const days = returnDate.diff(pickUpDate, "days");
    return price * (days + 1);
  };

  const handlePickupDateChange = (date) => {
    setPickupDate(date);
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
  };

  const handlePayment = async () => {
    const calculatedPrice = calculatePrice();

    const fetchBook = async () => {
      try {
        const response = await axios.post("/booking/bookit", {
          vehicleId,
          pickUpDate,
          returnDate,
          price: calculatedPrice,
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching booking:", error);
        return null;
      }
    };

    const res = await fetchBook();

    if (res) {
      console.log(res);
      navigate("/Payment", {
        state: { bookId: res.bookId, calprice: calculatedPrice },
      });
    }
  };

  const handleCancel = () => {
    navigate("/CustomerDB");
  };

  return (
    <Container>
      <BackgroundOverlay />
      <CardContainer>
        <StyledCard>
          <CardContent>
            <center>
              <h2 style={{ height: 30, color: "#022859", fontWeight: "bold" }}>
                RIDE-IT RENTALS
              </h2>
            </center>
            <center>
              <h2
                style={{
                  height: 30,
                  color: "#022859",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                BOOK NOW
              </h2>
            </center>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div>
                <CustomDatePicker
                  label="Pickup Date"
                  value={pickUpDate}
                  onChange={handlePickupDateChange}
                  renderInput={(params) => (
                    <StyledTextField {...params} fullWidth />
                  )}
                  margin="normal"
                />
              </div>
              <br />
              <div>
                <CustomDatePicker
                  label="Return Date"
                  value={returnDate}
                  onChange={handleReturnDateChange}
                  renderInput={(params) => (
                    <StyledTextField {...params} fullWidth />
                  )}
                />
              </div>
              <br />
              <div>
                {returnDate && pickUpDate && (
                  <p style={{ fontWeight: "bold" }}>
                    TOTAL PRICE: Rs. {calculatePrice()}
                  </p>
                )}
              </div>
              <br />
              <div>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <BoldButton style={{ color: "white" }} onClick={handlePayment}>
                    BOOK NOW
                  </BoldButton>
                  <BoldButton style={{ color: "white" }} onClick={handleCancel}>
                    CANCEL
                  </BoldButton>
                </Stack>
              </div>
            </LocalizationProvider>
          </CardContent>
        </StyledCard>
        <DetailsCard>
          <CardContent>
            <h2 style={{ height: 30, color: "#022859", fontWeight: "bold" }}>
              Car Details
            </h2>
            <img
              src={image}
              alt={model}
              style={{ width: "80%", height: "auto", marginBottom: "16px" }}
            />
            <p style={{ color: "#022859" }}>
              <strong>Model:</strong> {model}
            </p>
            <p style={{ color: "#022859" }}>
              <strong>Type:</strong> {type}
            </p>
            <p style={{ color: "#022859" }}>
              <strong>Pick-Up and Drop Location:</strong> {location.state?.address}
            </p>
            <h2 style={{ height: 30, color: "#022859", fontWeight: "bold" }}>
              Agency Details
            </h2>
            <p style={{ color: "#022859" }}>
              <strong>Name:</strong> {agency}
            </p>
            <p style={{ color: "#022859" }}>
              <strong>Contact:</strong> {phoneno}
            </p>

          </CardContent>
        </DetailsCard>
      </CardContainer>
    </Container>
  );
}

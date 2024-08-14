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
  Input,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [username, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [zip, setZip] = useState("");
  const [role, setRole] = useState("agency");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessLicense, setDocument] = useState(null);
  const [businessLicensePreview, setBusinessLicensePreview] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    try {
      if (!emailRegex.test(email)) {
        setError("Invalid email format");
        return;
      }
      if (!phoneRegex.test(phoneNumber)) {
        setError("Invalid phone number format");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      let documentBase64 = "";
      if (businessLicense) {
        const reader = new FileReader();
        reader.onloadend = () => {
          documentBase64 = reader.result.split(",")[1]; 
          submitFormData(documentBase64);
        };
        reader.readAsDataURL(businessLicense);
      } else {
        submitFormData();
      }
    } catch (error) {
      console.error("There was an error registering!", error);
      alert("Registration failed!");
    }
  };

  const submitFormData = async (documentBase64 = "") => {
    const userData = {
      ...(role === "agency" && {
        username,
        phoneNumber,
        email,
        password,
        area,
        city,
        zip,
        businessLicense: documentBase64,
      }),
      ...(role === "customer" && { role, phoneNumber, email, password, username }),
    };

    try {
      if (role === "customer") {
        const response = await axios.post("http://localhost:8080/user/register", userData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        navigate("/login");
      } else {
        const response = await axios.post("http://localhost:8080/agency/register", userData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        alert("Request sent, once accepted you will receive an email!");
        navigate("/");
      }
    } catch (error) {
      console.error("There was an error registering!", error);
      alert("Registration failed!");
    }
  };

  const handleDocumentChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setDocument(file);
      const url = URL.createObjectURL(file);
      setBusinessLicensePreview(url);
    }
  };

  const renderForm = () => {
    if (role === "agency") {
      return (
        <>
          <Grid item xs={12}>
            <TextField
              label="Agency Name"
              fullWidth
              variant="filled"
              value={username}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="City"
              fullWidth
              variant="filled"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Area"
              fullWidth
              variant="filled"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Zip"
              fullWidth
              variant="filled"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="upload-document">Business License</label>
            <Input
              id="upload-document"
              type="file"
              accept="application/pdf"
              fullWidth
              variant="filled"
              onChange={handleDocumentChange}
            />
            {businessLicensePreview && (
              <embed
                src={businessLicensePreview}
                width="100%"
                height="auto"
                style={{ marginTop: "10px" }}
              />
            )}
          </Grid>
        </>
      );
    } else {
      return (
        <Grid item xs={12}>
          <TextField
            label="Name"
            fullWidth
            variant="filled"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://i.gaw.to/vehicles/photos/08/49/084974_2018_lincoln_Continental.jpg?1024x640)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Paper
        elevation={3}
        style={{
          marginLeft: "400px",
          marginRight: "400px",
          padding: 25,
          backgroundColor: "#e9e6f1c9",
        }}
      >
        <center>
          <h2 style={{ color: "#022859" }}>REGISTRATION</h2>
        </center>
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
          <Grid item xs={5}>
            <center>
              <FormControl component="fieldset">
                <center>
                  <FormLabel component="legend" sx={{ color: "#022859", "&:hover": { color: "#022859" } }}>
                    SELECT ROLE
                  </FormLabel>
                </center>
                <RadioGroup
                  row
                  aria-label="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel value="agency" control={<Radio />} label="Agency" />
                  <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                </RadioGroup>
              </FormControl>
            </center>
          </Grid>
          {renderForm()}
          <Grid item xs={6}>
            <TextField
              label="Phone Number"
              fullWidth
              variant="filled"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              fullWidth
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              variant="filled"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <p style={{ color: "red" }}>{error}</p>
            </Grid>
          )}
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#022859", color: "white" }}
              onClick={handleRegister}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default RegistrationForm;

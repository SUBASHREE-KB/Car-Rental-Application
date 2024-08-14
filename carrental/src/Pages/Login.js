import React, { useState } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from '../setupAxios';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!email || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await axios.post("/log", {
        email,
        password,
      });
      const token = response.data;
      localStorage.setItem("token", token);

      // Navigate based on role
      const role = JSON.parse(atob(token.split(".")[1])).role;
      if (role === "Admin") {
        navigate("/Admindb");
      } else if (role === "customer") {
        navigate("/Customerdb");
      } else if (role === "agency") {
        navigate("/agencydb");
      }

      console.log("Login successful:", response.data);
    } catch (error) {
      setError("Invalid username or password.");
      console.error("Login error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://i.gaw.to/vehicles/photos/08/49/084974_2018_lincoln_Continental.jpg?1024x640")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Paper elevation={3} style={{ padding: 12, backgroundColor: "#e9e6f1c9",width:400,height:400}}>
        <center>
          <h2 style={{ color: "#022859" ,marginTop:50}}>LOGIN</h2>
        </center>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              variant="filled"
              value={email}
              marginTop="5px"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <center>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#022859",
                  "&:hover": { backgroundColor: "#022859" },
                  fontSize: 20,
                  color: "white",
                  marginTop:0
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </center>
          </Grid>
          <Grid item xs={12}>
            <center>
              <Button variant="text" sx={{ color: "#022859" }}>
                Forgot Password
              </Button>
            </center>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <center style={{ color: "#022859" }}>{error}</center>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  );
}

export default Login;

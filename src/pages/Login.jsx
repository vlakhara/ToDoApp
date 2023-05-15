import React, { useState } from "react";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import Notification from "../common/Notification";
import CommonContainer from "../common/CommonContainer";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState({
    open: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const [_, setCookies] = useCookies("access_token");

  const handleCredentialsChange = (event, type) => {
    const { value } = event?.target;
    setCredentials((prev) => {
      return { ...prev, [type]: value };
    });
  };

  const handleClose = () => {
    setUser({
      ...user,
      open: false,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", credentials);
      const { message, status, token, userId } = response?.data;
      setCookies("access_token", token);
      window.localStorage.setItem("userId", userId);
      if (status === "Failed") setUser({ open: true, message, type: "error" });
      else {
        setUser({ open: true, message: "Logging in", type: "success" });
        setTimeout(() => {
          navigate("/");
        }, [1000]);
      }
    } catch (err) {
      console.log({ err });
      setUser({
        open: true,
        message: err?.data?.message || "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <CommonContainer
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={2} sx={{ width: "20rem" }}>
        <Grid item xs={12}>
          <TextField
            label="Username"
            variant="filled"
            onChange={(event) => handleCredentialsChange(event, "username")}
            value={credentials.username}
            fullWidth
            size="medium"
            InputProps={{
              sx: {
                letterSpacing: 2,
                paddingX: 1,
              },
            }}
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            variant="filled"
            onChange={(event) => handleCredentialsChange(event, "password")}
            value={credentials.password}
            fullWidth
            size="medium"
            InputProps={{
              sx: {
                letterSpacing: 2,
                paddingX: 1,
              },
            }}
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} textAlign="right">
          <Link style={{ textDecoration: "none" }}>
            <Typography>Forgot password?</Typography>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            sx={{ height: "3rem", fontWeight: 700, letterSpacing: 3 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Typography>NEW USER?</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            sx={{ height: "3rem", fontWeight: 700, letterSpacing: 3 }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Grid>
      </Grid>
      <Notification user={user} handleClose={handleClose} />
    </CommonContainer>
  );
};

export default Login;

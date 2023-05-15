import React, { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../common/Notification";
import CommonContainer from "../common/CommonContainer";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirm: "",
  });
  const [user, setUser] = useState({
    open: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const handleCredentialsChange = (event, type) => {
    const { value } = event?.target;

    setCredentials((prev) => {
      return { ...prev, [type]: value };
    });
  };

  const handleRegister = async () => {
    if (
      !credentials.username?.trim() ||
      !credentials.password?.trim() ||
      !credentials.confirm?.trim()
    )
      setUser({
        open: true,
        message: "Each and every field should be filled",
        type: "error",
      });
    else {
      if (credentials.password === credentials.confirm) {
        try {
          const response = await axios.post("/auth/register", credentials);
          if (response.data?.status === "Success") {
            setUser({
              open: true,
              message: response.data?.message,
              type: "success",
            });
            setTimeout(() => {
              navigate("/login");
            }, [1000]);
          } else {
            setUser({
              open: true,
              message: response.data?.message,
              type: "error",
            });
          }
        } catch (err) {
          console.log({ err });
        }
      } else {
        setUser({
          open: true,
          message: "Password doesn't match",
          type: "error",
        });
      }
    }
  };
  const handleClose = () => {
    setUser({
      ...user,
      open: false,
    });
  };

  return (
    <CommonContainer
      sx={{
        height: "100vh",
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
            variant="filled"
            type="password"
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
        <Grid item xs={12}>
          <TextField
            label="Confirm Password"
            type="password"
            variant="filled"
            onChange={(event) => handleCredentialsChange(event, "confirm")}
            value={credentials.confirm}
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
          <Button
            variant="contained"
            fullWidth
            sx={{ height: "3rem", fontWeight: 700, letterSpacing: 3 }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Typography>ALREADY HAVE AN ACCOUNT?</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            sx={{ height: "3rem", fontWeight: 700, letterSpacing: 3 }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Grid>
      </Grid>
      <Notification user={user} handleClose={handleClose} />
    </CommonContainer>
  );
};
export default Register;

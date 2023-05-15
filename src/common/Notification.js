import { Alert, Snackbar } from "@mui/material";
import React from "react";

const Notification = ({ user, handleClose }) => {
  return (
    <Snackbar
      open={user.open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        elevation={6}
        variant="filled"
        severity={user?.type}
        sx={{ width: "100%" }}
      >
        {user.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;

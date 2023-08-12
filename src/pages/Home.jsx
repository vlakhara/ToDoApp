import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import CommonContainer from "../common/CommonContainer";
import { useCookies } from "react-cookie";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import Todo from "../components/Todo";
import AddIcon from "@mui/icons-material/Add";
import Notification from "../common/Notification";
import ListAltIcon from "@mui/icons-material/ListAlt";

const Home = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState();
  const [action, setAction] = useState({
    open: false,
    message: "",
    type: "",
  });
  const [todo, setTodo] = useState({
    title: "",
    priority: "Low",
    completed: false,
  });
  const [cookies, __, removeCookies] = useCookies(["access_token"]);
  const handleLogOut = () => {
    removeCookies(["access_token"]);
    localStorage.removeItem("userId", "");
    navigate("/login");
  };

  useEffect(() => {
    getTodos();
  }, []);

  // API Calls
  const getTodos = async () => {
    const response = await axios.get("/todo/get");
    setTodos(response.data?.todos.reverse());
  };
  const handleToDoAdd = async () => {
    if (todo.title.trim().length === 0) {
      setAction({ open: true, message: "Enter Title!!", type: "error" });
      return;
    }
    const response = await axios.post("/todo/add", todo);
    setAction({ open: true, message: "To Do Added!!", type: "success" });
    getTodos();
    setTodo({ title: "", priority: "Low", completed: false });
  };
  const handleCompleted = async (id) => {
    await axios.put("/todo/update", { completed: true, id });
    setAction({ open: true, message: "To Do Completed!!", type: "success" });
    getTodos();
  };
  const handleDelete = async (id) => {
    await axios.delete(`/todo/delete/${id}`);
    setAction({ open: true, message: "To Do Deleted!!", type: "success" });
    getTodos();
  };

  const handleClose = () => {
    setAction({
      ...action,
      open: false,
    });
  };
  if (!cookies["access_token"] || !localStorage.getItem("userId")) {
    return <Navigate to="/login" />;
  }
  return (
    <CommonContainer
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Grid container spacing={2} my={3}>
        <Grid item container spacing={1} mb={2} mt={{ md: 0, xs: 5 }}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="space-between"
            mb={1}
          >
            <Box
              sx={{
                height: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "7rem",
                borderRadius: 1,
                boxShadow: "0px 0px 5px #1B9C85",
                gap: 1,
              }}
            >
              <ListAltIcon sx={{ color: "#1B9C85" }} fontSize="large" />
              <Typography sx={{ color: "#1B9C85", fontWeight: 700 }}>
                TO DO
              </Typography>
            </Box>
            <Button
              variant="outlined"
              sx={{
                height: "3rem",
                width: "4rem",
                borderRadius: 1,
                pl: 2,
                boxShadow: "0px 0px 5px #1B9C85",
              }}
              onClick={handleLogOut}
            >
              <LogoutIcon sx={{ color: "#1B9C85" }} />
            </Button>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="Title"
              variant="filled"
              fullWidth
              value={todo.title}
              onChange={(event) =>
                setTodo((prev) => {
                  return { ...prev, ["title"]: event.target.value };
                })
              }
              InputLabelProps={{ sx: { letterSpacing: 1 } }}
              InputProps={{
                sx: {
                  letterSpacing: 1,
                  paddingX: 1,
                },
              }}
            />
          </Grid>
          <Grid item md={1.95} sm={4} xs={12}>
            <TextField
              label="Priority"
              variant="filled"
              select
              defaultValue={todo.priority}
              value={todo.priority}
              sx={{ width: "100%" }}
              InputLabelProps={{ sx: { letterSpacing: 1 } }}
              onChange={(event) =>
                setTodo((prev) => {
                  return { ...prev, ["priority"]: event.target.value };
                })
              }
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </TextField>
          </Grid>
          <Grid item md={0.8} sm={1} xs={12}>
            <Button
              color="primary"
              variant="contained"
              sx={{
                height: "3.5rem",
                width: "100%",
                borderRadius: 5,
                boxShadow: "0px 0px 5px grey",
                backgroundColor: "#1B9C85",
              }}
              onClick={handleToDoAdd}
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          {todos?.map((todo) => (
            <Todo
              todo={todo}
              onDone={handleCompleted}
              onDelete={handleDelete}
            />
          ))}
        </Grid>
      </Grid>

      <Notification user={action} handleClose={handleClose} />
    </CommonContainer>
  );
};

export default Home;

import { Box, Button, Chip, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

const Todo = ({ todo, onDone, onDelete }) => {
  const priorities = { High: "#ED2B2A", Medium: "#F15A59", Low: "#1B9C85" };
  return (
    <>
      <Grid item md={6} xs={12}>
        <Grid
          item
          xs={12}
          container
          sx={{
            pl: 2,
            pt: 2,
            pr: 1,
            pb: 1,
            minHeight: "9rem",
            boxShadow: "0px 0px 3px gray",
            borderLeft: "15px solid",
            borderColor: todo.completed ? "#245953" : "#FC4F00",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              wordWrap: "break-word",
            }}
            pr={2}
          >
            <Typography fontWeight={700}>{todo.title}</Typography>
          </Grid>
          {!todo.completed && (
            <Grid item xs={12}>
              <Typography color="grey" fontWeight={600} letterSpacing={1}>
                Created on {todo.createdOn}
              </Typography>
            </Grid>
          )}
          <Grid
            item
            xs={12}
            mt={1}
            display="flex"
            alignItems={{ sm: "center", xs: "flex-start" }}
            justifyContent={{ sm: "space-between", xs: "flex-start" }}
            height="fit-content"
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Box>
              <Chip
                label={todo.priority}
                variant="contained"
                sx={{
                  borderRadius: 1,
                  mr: 1,
                  backgroundColor: priorities[todo.priority],
                  fontWeight: 700,
                  color: "#fff",
                  mt: { sm: 0, xs: 1 },
                }}
              />
              {todo.completed && (
                <Chip
                  label={todo.createdOn}
                  variant="contained"
                  sx={{
                    borderRadius: 1,
                    backgroundColor: "#1B9C85",
                    fontWeight: 700,
                    color: "#fff",
                    mt: { sm: 0, xs: 1 },
                  }}
                />
              )}
            </Box>
            <Box
              mt={{ sm: 0, xs: 1 }}
              sx={{
                width: { sm: "unset", xs: "100%" },
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {!todo.completed && (
                <IconButton
                  sx={{
                    borderRadius: 1,
                    border: "2px solid #1B9C85",
                    color: "#1B9C85",
                  }}
                  onClick={() => onDone(todo._id)}
                >
                  <DoneIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton
                onClick={() => onDelete(todo._id)}
                color="error"
                sx={{ ml: 1, borderRadius: 1, border: "2px solid #ED2B2A" }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Todo;

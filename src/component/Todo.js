import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CheckIcon from "@mui/icons-material/Check";
import ButtonGroup from "@mui/material/ButtonGroup";
import "../style.css";
import { useContext, useState } from "react";
import { ListContext } from "../context/ListContext";
import { ToastContext } from "../context/ToastContext";

export default function Todo({ id, todo, deletehandler, editHandler }) {
  const { Context, SetContext } = useContext(ListContext);
  const { OpenHideToast } = useContext(ToastContext);
  let updatedTodo = [];

  function handelCheck() {
    updatedTodo = Context.map((item) => {
      if (item.id === todo.id) {
        if (item.status === "Done") {
          return { ...item, status: "unDone" };
        }
        return { ...item, status: "Done" };
      }
      return item;
    });

    SetContext(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    OpenHideToast("Task edited successfully");
  }

  return (
    <>
      <Card key={id} className="card" sx={{ marginTop: 2, background: "blue" }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textDecoration:
                    todo.status === "Done" ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6">{todo.content}</Typography>
            </Grid>
            <Grid size={4}>
              <ButtonGroup
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <IconButton
                  aria-label="delete"
                  size="small"
                  className="btn"
                  sx={{
                    color: todo.status === "Done" ? "white" : "green",
                    background: todo.status === "Done" ? "green" : "white",
                    border: "solid 2px green",
                  }}
                  onClick={handelCheck}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  className="btn"
                  sx={{
                    color: "blue",
                    background: "white",
                    border: "solid 2px blue",
                  }}
                  onClick={() => editHandler(todo)}
                >
                  <ModeEditOutlineIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  className="btn"
                  sx={{
                    color: "red",
                    background: "white",
                    border: "solid 2px red",
                  }}
                  onClick={() => deletehandler(todo)}
                >
                  <DeleteIcon />
                </IconButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

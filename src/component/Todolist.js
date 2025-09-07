import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "../context/ListContext";
import { ToastContext } from "../context/ToastContext";

import Todo from "./Todo";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function Todolist() {
  const [active, setActive] = useState("All");
  const { Context, SetContext } = useContext(ListContext);
  const { OpenHideToast } = useContext(ToastContext);

  const [title, setTitle] = useState("");
  const [ShowDeleteDialog, setShowDeleteDialog] = useState(false);
  const [SoeEditDialog, setShowEditDialog] = useState(false);
  const [todostate, setTodostate] = useState({});

  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  let updatedTodo = [];

  useEffect(() => {
    const list = localStorage.getItem("todos") ?? {};
    SetContext(JSON.parse(list));
  }, []);

  // handler
  const handelChange = (event, newValue) => {
    setActive(newValue);
  };

  function AddClick() {
    const newTodo = {
      id: Context.length + 2,
      title: title,
      content: "the place of the task " + parseInt(Context.length + 2),
      status: "unDone",
    };

    const list = [...Context, newTodo];
    SetContext(list);
    localStorage.setItem("todos", JSON.stringify(list));

    setTitle("");
    OpenHideToast("Task added successfully");
  }

  function handleDelete(todo) {
    setTodostate(todo);
    setShowDeleteDialog(true);
  }

  function handleEdit(todo) {
    setTodostate(todo);
    setInputTitle(todo.title);
    setInputContent(todo.content);
    setShowEditDialog(true);
  }

  function handleDeleteConfirm() {
    updatedTodo = Context.filter((item) => {
      return item.id !== todostate.id;
    });
    SetContext(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    setShowDeleteDialog(false);
    OpenHideToast("Task deleted successfully");
  }

  function handleEditConfirm() {
    updatedTodo = Context.map((item) => {
      if (item.id === todostate.id) {
        return { ...item, title: inputTitle, content: inputContent };
      }
      return item;
    });
    SetContext(updatedTodo);
    setShowEditDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    OpenHideToast("Task edited successfully");
  }

  let ListContent = Context.filter((i) => {
    return i.status === active || active === "All";
  }).map((item) => {
    return (
      <Todo
        key={item.id}
        todo={item}
        deletehandler={handleDelete}
        editHandler={handleEdit}
      />
    );
  });

  return (
    <>
      {/* delete dialog */}
      <Dialog
        open={ShowDeleteDialog}
        slots={{}}
        keepMounted
        onClose={() => setShowDeleteDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Close</Button>
          <Button onClick={handleDeleteConfirm}>Sure</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={SoeEditDialog}
        keepMounted
        onClose={() => {
          setShowEditDialog(false);
          setInputTitle(todostate.title);
          setInputContent(todostate.content);
        }}
      >
        <DialogTitle>{"Edit Task"}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 350,
          }}
        >
          <TextField
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            sx={{ mt: 2 }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            size="small"
          />
          <TextField
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            sx={{ mt: 2 }}
            id="outlined-basic"
            label="Content"
            variant="outlined"
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditConfirm}>Sure</Button>
        </DialogActions>
      </Dialog>

      {/* Todolist */}
      <Card
        sx={{
          padding: 2,
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Typography variant="h3" sx={{ mb: 0, textAlign: "center" }}>
          Task
        </Typography>
        <Divider />
        <ToggleButtonGroup
          color="primary"
          value={active}
          exclusive
          onChange={handelChange}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <ToggleButton value="Done">Done</ToggleButton>
          <ToggleButton value="unDone">unDone</ToggleButton>
          <ToggleButton value="All">All</ToggleButton>
        </ToggleButtonGroup>

        {ListContent}

        <Grid container spacing={2} sx={{ marginTop: 2, zIndex: 1 }}>
          <Grid size={4}>
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              onClick={AddClick}
              color="primary"
              disabled={title.length === 0}
            >
              <Typography>Add</Typography>
            </Button>
          </Grid>
          <Grid size={8}>
            <TextField
              id="outlined-basic"
              label="outlined"
              variant="outlined"
              size="small"
              sx={{ width: "100%" }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

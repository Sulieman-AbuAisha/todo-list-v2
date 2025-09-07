import "./App.css";
import Todolist from "./component/Todolist";
import Container from "@mui/material/Container";
import { ListContext } from "./context/ListContext";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MySnakebar from "./component/MySnakebar";
import { ToastContext } from "./context/ToastContext";

const list = [
  {
    id: 1,
    title: "Task 1",
    content: "the place of the task 1 in",
    status: "Done",
  },
  {
    id: 2,
    title: "Task 2",
    content: "the place of the task 2 in",
    status: "unDone",
  },
  {
    id: 3,
    title: "Task 3",
    content: "the place of the task 3 in",
    status: "Done",
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#d84315",
    },
  },
});

function App() {
  const [open, setOpen] = useState(false);
  const [Context, SetContext] = useState(list);
  const [message, setMessage] = useState("");

  function OpenHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ListContext.Provider value={{ Context, SetContext }}>
      <Container
        maxWidth={false}
        sx={{ background: "#282c34", minHeight: "100vh" }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: " center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <ThemeProvider theme={theme}>
            <ToastContext.Provider value={{ OpenHideToast }}>
              <MySnakebar open={open} message={message} />
              <Todolist />
            </ToastContext.Provider>
          </ThemeProvider>
        </Container>
      </Container>
    </ListContext.Provider>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Components
import PrivateRoute from "./util/PrivateRoute";
import LoginRoute from "./util/LoginRoute";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";

const theme = createTheme({
  palette: {
    primary: {
      light: "#534bae",
      main: "#0DBFD5",
      dark: "#000051",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#8e99f3",
      main: "#0DBFD5",
      dark: "#26418f",
      contrastText: "#ffffff",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export const BASE_ENDPOINT =
  process.env.REACT_APP_API_URL || "http://localhost:8080";
axios.defaults.baseURL = BASE_ENDPOINT;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Home />} />
            </Route>
            <Route exact path="/login" element={<LoginRoute />}>
              <Route exact path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;

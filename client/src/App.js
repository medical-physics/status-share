import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import axios from "axios";

// Components
import HomeRoute from "./util/HomeRoute";
import LoginRoute from "./util/LoginRoute";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";

// Pages
import home from "./pages/home";
import login from "./pages/login";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#534bae",
      main: "#1a237e",
      dark: "#000051",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#8e99f3",
      main: "#5c6bc0",
      dark: "#26418f",
      contrastText: "#ffffff"
    }
  },
  typography: {
    useNextVariants: true
  }
});

axios.defaults.baseURL = "https://localhost:5000";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div className="container">
            <Switch>
              <HomeRoute exact path="/" component={home} />
              <LoginRoute exact path="/login" component={login} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;

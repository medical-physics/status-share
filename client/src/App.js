import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Components
import HomeRoute from "./util/HomeRoute";
import LoginRoute from "./util/LoginRoute";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

// Pages
import home from "./pages/home";
import login from "./pages/login";

const theme = createTheme({
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
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Router>
                    <div className="container">
                        <Routes>
                            <HomeRoute exact path="/" component={home} />
                            <LoginRoute exact path="/login" component={login} />
                        </Routes>
                    </div>
                </Router>
            </Provider>
        </ThemeProvider>
    );
}

export default App;

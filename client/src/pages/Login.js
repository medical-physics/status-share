import React from "react";
import styles from "../styles/pages/Login.json";
import "../styles/pages/login.css";

// Components
import NavBar from "../components/NavBar";

// MUI components
import { Checkbox, CircularProgress, FormControlLabel } from "@mui/material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  loginUserAsync,
  getAppNameAsync,
  setRememberMe,
  checkingAuth,
  logoutUser,
} from "../redux/slices/accountSlice";
import { initializeDarkMode } from "../util/DarkMode";
import { clearCachedAccountDetails } from "../util/Authenticator";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setStateRememberMe] = React.useState(false);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.UI.loading);
  const appName = useSelector((state) => state.account.appName);
  const errors = useSelector((state) => state.account.errors);
  const darkMode = useSelector((state) => state.account.darkMode);

  React.useEffect(() => {
    initializeDarkMode();
    clearCachedAccountDetails();
    dispatch(logoutUser());
    dispatch(getAppNameAsync());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: email.trim().toLowerCase().concat("@bccancer.bc.ca"),
      password,
    };

    if (rememberMe) {
      dispatch(setRememberMe());
    }
    localStorage.setItem("rememberMe", rememberMe);
    dispatch(checkingAuth());
    dispatch(loginUserAsync(userData));
  };

  const handleCheck = (event) => {
    setStateRememberMe(event.target.checked);
  };

  return (
    <div className={"page-container" + (darkMode ? " dark-mode" : "")}>
      <NavBar />
      <div className="form-container">
        <form noValidate onSubmit={handleSubmit}>
          <p className="form-title">Sign In</p>
          <div className="input-container">
            <input
              className={"form-input" + (darkMode ? " dark-mode" : "")}
              style={{ marginTop: "30px" }}
              placeholder="Username"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div className="error-message">
              {errors?.email && <p className="error-text">{errors?.email}</p>}
            </div>
            <input
              className={"form-input" + (darkMode ? " dark-mode" : "")}
              style={{ marginTop: "20px" }}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="error-message">
              {errors?.password && (
                <p className="error-text">{errors?.password}</p>
              )}
              {errors?.general && (
                <p className="error-text">{errors?.general}</p>
              )}
            </div>
            <div className="button-container">
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={rememberMe}
                    onChange={handleCheck}
                    color="primary"
                    sx={{ ...styles.checkbox, color: darkMode ? "#7A7A7A" : "#0D1117" }}
                  />
                }
                label="Remember me"
                sx={{ ...styles.checkboxContainer, color: darkMode ? "#7A7A7A" : "#0D1117" }}
              />
              <button type="submit" style={{ color: darkMode ? "#0D1117" : "#EEEEEE" }}>
                {loading ? (
                  <CircularProgress
                    size={15}
                    thickness={5}
                    sx={styles.progress}
                  />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <p className={"bottom-text" + (darkMode ? " dark-mode" : "")}>
        © 2024 BC Cancer: Medical Physics. All rights reserved.
      </p>
    </div>
  );
}

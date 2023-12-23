import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/components/NavBar.json";
import "../styles/components/nav-bar.css";

// Components
import EditAppName from "./EditAppName";
import AddTeamDialog from "./AddTeamDialog";
import BcCancerLogo from "../images/bc-cancer-logo.png";

// MUI components
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { CheckCircleOutline as CheckCircleOutlineIcon } from "@mui/icons-material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  logoutUser,
  truncateAppName,
  detruncateAppName,
} from "../redux/slices/accountSlice";

export default function NavBar() {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.account.authenticated);
  const appName = useSelector((state) => state.account.appName);
  const admin = useSelector((state) => state.account.admin);
  const darkMode = useSelector((state) => state.account.darkMode);

  React.useEffect(() => {
    function updateTitle() {
      if (window.innerWidth < 550) {
        dispatch(truncateAppName());
      } else {
        dispatch(detruncateAppName());
      }
    }

    updateTitle();
    window.addEventListener("resize", updateTitle);

    return function cleanup() {
      window.removeEventListener("resize", updateTitle);
    };
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const navBarClasses = authenticated
    ? darkMode
      ? "nav-bar logged-in dark-mode"
      : "nav-bar logged-in"
    : "nav-bar";
  const logoClasses = authenticated
    ? "bc-cancer-logo logged-in"
    : "bc-cancer-logo";

  return (
    <div>
      <div className={navBarClasses}>
        <div className="title-container">
          <img src={BcCancerLogo} className={logoClasses} />
          <p className="app-name">{appName}</p>
        </div>
        {authenticated && (
          <button
            onClick={handleLogout}
            type="submit"
            style={{ marginRight: "4vw", color: darkMode ? "black" : "white" }}
          >
            Sign Out
          </button>
        )}
      </div>
      <div className="divider" />
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/nav-bar.css";

// Components
import EditAppNameDialog from "./EditAppNameDialog";
import AddTeamDialog from "./AddTeamDialog";
import DarkModeSwitch from "./DarkModeSwitch";
import SendMessageDialog from "./SendMessageDialog";
import BcCancerLogo from "../images/bc-cancer-logo.png";

// MUI components
import { Button } from "@mui/material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  logoutUser,
  truncateAppName,
  detruncateAppName,
  setIsMobile,
} from "../redux/slices/accountSlice";

export default function NavBar() {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.account.authenticated);
  const appName = useSelector((state) => state.account.appName);
  const admin = useSelector((state) => state.account.admin);
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  const hasWindow = typeof window !== "undefined";

  React.useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        dispatch(setIsMobile(window.innerWidth < 500));
      }

      dispatch(setIsMobile(window.innerWidth < 500));
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode-global");
      document.body.classList.add("dark-scrollbar");
    } else {
      document.body.classList.remove("dark-mode-global");
      document.body.classList.remove("dark-scrollbar");
    }
  }, [darkMode]);

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

  const navBarClasses = authenticated ? "nav-bar logged-in" : "nav-bar";
  const logoClasses = authenticated
    ? "bc-cancer-logo logged-in"
    : "bc-cancer-logo";

  return (
    <div>
      <div className={navBarClasses + (darkMode ? " dark-mode" : "")}>
        <div className="title-container">
          <img src={BcCancerLogo} className={logoClasses} />
          {(!isMobile || !authenticated) && (
            <p className="app-name">{appName}</p>
          )}
          {!isMobile &&
            (JSON.parse(localStorage.getItem("admin")) || admin) && (
            <div style={{ marginLeft: "15px" }}>
              <EditAppNameDialog />
              <AddTeamDialog />
            </div>
          )}
        </div>
        <div
          className="title-container"
          style={{ marginRight: isMobile && !authenticated ? "7vw" : "4vw" }}
        >
          {authenticated && 
            <SendMessageDialog />
          }
          <DarkModeSwitch />
          {authenticated && (
            <Button
              onClick={handleLogout}
              disableElevation
              color="primary"
              variant="contained"
              component={Link}
              to="/login"
              sx={{
                marginLeft: "10px",
                "&:hover": { backgroundColor: "#2FA2B9" },
                marginRight: isMobile ? "2vw" : "",
              }}
            >
              <p className={"sign-out-button" + (darkMode ? " dark-mode" : "")}>
                Sign Out
              </p>
            </Button>
          )}
        </div>
      </div>
      <div className={"divider" + (authenticated ? " logged-in" : "")} />
    </div>
  );
}

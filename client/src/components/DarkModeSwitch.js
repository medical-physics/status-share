import React from "react";
import "../styles/components/dark-mode-switch.css";

// MUI components
import { Switch } from "@mui/material";
import {
  LightMode as LightModeIcon
} from "@mui/icons-material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode, setLightMode } from "../redux/slices/accountSlice";

export default function DarkModeSwitch() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.account.darkMode);

  const handleChange = (event) => {
    if (event.target.checked) {
      dispatch(setDarkMode());
    } else {
      dispatch(setLightMode());
    }
  };

  return (
    <div className="container">
      <LightModeIcon />
      <Switch
        checked={darkMode}
        onChange={handleChange}
        sx={{
          "& .MuiSwitch-thumb": {
            backgroundColor: "#0DBFD5"
          },
          "& .MuiSwitch-track": {
            backgroundColor: "#A9A9A9"
          }
        }}
      />
    </div>
  );
}

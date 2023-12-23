import React from "react";

// MUI components
import { Switch } from "@mui/material";

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
    <Switch
      checked={darkMode}
      onChange={handleChange}
    />
  );
}

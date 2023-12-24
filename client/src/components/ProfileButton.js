import React from "react";
import PropTypes from "prop-types";
import "../styles/components/profile-button.css";

// MUI components
import { IconButton, Tooltip } from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function ProfileButton(props) {
  const { onClick, unreadMessages, name } = props;
  const tooltipString = "New messages: " + unreadMessages;
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  if (unreadMessages > 0) {
    return (
      <Tooltip title={tooltipString} arrow className="tooltip">
        <div className="container">
          {!isMobile && (
            <IconButton
              onClick={onClick}
              style={{ marginTop: "-2px", color: "#b4004e" }}
              size="small"
            >
              <NotificationsIcon />
            </IconButton>
          )}
          <p
            onClick={onClick}
            className="name-text"
            style={{ cursor: "pointer", color: darkMode ? "#d3d0ca" : "" }}
          >
            {name}
          </p>
        </div>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={tooltipString} arrow className="tooltip">
        <div className="container">
          {!isMobile && (
            <IconButton
              onClick={onClick}
              size="small"
              sx={{ marginTop: "-2px", color: darkMode ? "#d3d0ca" : "" }}
            >
              <AccountCircleIcon />
            </IconButton>
          )}
          <p
            onClick={onClick}
            className="name-text"
            style={{ cursor: "pointer", color: darkMode ? "#d3d0ca" : "" }}
          >
            {name}
          </p>
        </div>
      </Tooltip>
    );
  }
}

ProfileButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  unreadMessages: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

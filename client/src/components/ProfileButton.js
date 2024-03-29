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
  const { onClick, unreadMessages, name, memo } = props;
  const tooltipString = unreadMessages
    ? "New messages: " + unreadMessages
    : "Memo: " + memo;
  const darkMode = useSelector((state) => state.account.darkMode);
  const isMobile = useSelector((state) => state.account.isMobile);

  if (unreadMessages > 0) {
    return (
      <div className="tooltip">
        <Tooltip
          title={tooltipString}
          arrow
          PopperProps={{
            sx: {
              zIndex: 0,
            },
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -17],
                },
              },
            ],
          }}
        >
          <div className="container" onClick={onClick}>
            {!isMobile && (
              <IconButton
                style={{ zIndex: 1, marginTop: "-2px", color: "#C63D2F" }}
                size="small"
              >
                <NotificationsIcon />
              </IconButton>
            )}
            <p
              className="name-text"
              style={{
                zIndex: 1,
                cursor: "pointer",
                color: isMobile ? "#C63D2F" : darkMode ? "#d3d0ca" : "",
                fontWeight: isMobile ? "bold" : "",
              }}
            >
              {name}
            </p>
          </div>
        </Tooltip>
      </div>
    );
  } else {
    return (
      <div className="tooltip">
        <Tooltip
          title={tooltipString}
          arrow
          PopperProps={{
            sx: {
              zIndex: 0,
            },
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -17],
                },
              },
            ],
          }}
        >
          <div className="container" onClick={onClick}>
            {!isMobile && (
              <IconButton
                size="small"
                sx={{
                  zIndex: 1,
                  marginTop: "-2px",
                  color: darkMode ? "#d3d0ca" : "",
                }}
              >
                <AccountCircleIcon />
              </IconButton>
            )}
            <p
              className="name-text"
              style={{
                zIndex: 1,
                cursor: "pointer",
                color: darkMode ? "#d3d0ca" : "",
              }}
            >
              {name}
            </p>
          </div>
        </Tooltip>
      </div>
    );
  }
}

ProfileButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  unreadMessages: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  memo: PropTypes.string.isRequired,
};

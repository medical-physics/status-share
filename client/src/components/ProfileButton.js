import React from "react";
import PropTypes from "prop-types";

// MUI components
import {
  IconButton,
  Tooltip
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon
} from "@mui/icons-material";

export default function ProfileButton (props) {
  const { onClick, unreadMessages } = props;
  const tooltipString = "Unread messages: " + unreadMessages;

  if (unreadMessages > 0) {
    return (
      <Tooltip title={tooltipString} arrow>
        <IconButton onClick={onClick} style={{ color: "#b4004e" }} size='small'>
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={tooltipString} arrow>
        <IconButton onClick={onClick} size='small'>
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>
    );
  }
}

ProfileButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  unreadMessages: PropTypes.number.isRequired
};

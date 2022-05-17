import React, { Component } from "react";
import PropTypes from "prop-types";

// MUI components
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Tooltip from "@material-ui/core/Tooltip";
import NotificationsIcon from "@material-ui/icons/Notifications";

export class ProfileButton extends Component {

    render() {
        const { onClick, unreadMessages } = this.props;
        const tooltipString = "Unread messages: " + unreadMessages;

        if (unreadMessages > 0) {
            return (
                <Tooltip title={tooltipString} arrow>
                    <IconButton onClick={onClick} style={{ color: "#b4004e" }} size="small">
                        <NotificationsIcon />
                    </IconButton>
                </Tooltip>
            )
        } else {
            return (
                <Tooltip title={tooltipString} arrow>
                    <IconButton onClick={onClick} size="small">
                        <AccountCircleIcon />
                    </IconButton>
                </Tooltip>
            )
        }
    };
}

ProfileButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    unreadMessages: PropTypes.number.isRequired
};

export default ProfileButton;
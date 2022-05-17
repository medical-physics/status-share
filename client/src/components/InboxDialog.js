import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Components
import InboxTable from "./InboxTable";

// MUI components
import {
    Dialog,
    Button,
    DialogContent,
    DialogTitle,
    CircularProgress,
    IconButton
} from "@mui/material";

import {
    Close as CloseIcon,
    AllInbox as AllInboxIcon
} from "@mui/icons-material";

// Redux stuff
import { connect } from "react-redux";
import { getMailbox } from "../redux/actions/mailboxActions";

const styles = {
    spinnerDiv: {
        textAlign: "center",
        marginTop: 15,
        marginBottom: 15
    },
    closeButton: {
        textAlign: "center",
        position: "absolute",
        left: "92%",
        marginTop: 7
    },
    dialogContent: {
        height: 450
    },
    buttonIcon: {
        margin: "auto 5px auto auto"
    }
};

export class InboxDialog extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getMailbox(this.props.userId);
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.onClose();
    };

    render() {
        const { user: { name }, loading } = this.props;

        const dialogMarkup = loading ? (
            <div>
                <DialogTitle>Loading...</DialogTitle>
                <DialogContent sx={styles.dialogContent}>
                    <div sx={styles.spinnerDiv}>
                        <CircularProgress size={80} thickness={2} />
                    </div>
                </DialogContent>
            </div>
        ) : (
            <div>
                <DialogTitle>Inbox: {name}</DialogTitle>
                <DialogContent sx={styles.dialogContent}>
                    <InboxTable />
                </DialogContent>
            </div>
        )

        return (
            <Fragment>
                <Button onClick={this.handleOpen} style={{ color: "#388e3c" }} variant="outlined">
                    <AllInboxIcon sx={styles.buttonIcon} /> inbox
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="md">
                    <IconButton onClick={this.handleClose} sx={styles.closeButton} size="small">
                        <CloseIcon />
                    </IconButton>
                    {dialogMarkup}
                </Dialog>
            </Fragment>
        )
    };
}

const mapStateToProps = (state) => ({
    loading: state.mailbox.loadingMailbox,
    user: state.users.user
});

const mapActionsToProps = {
    getMailbox
};

InboxDialog.propTypes = {
    getMailbox: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    mailbox: PropTypes.array.isRequired,
    loadingMailbox: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(InboxDialog);

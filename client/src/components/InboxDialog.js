import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// Components
import InboxTable from "./InboxTable";

// MUI components
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import AllInboxIcon from "@material-ui/icons/AllInbox";

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
        const { classes, user: { name }, loading } = this.props;

        const dialogMarkup = loading ? (
            <div>
                <DialogTitle>Loading...</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <div className={classes.spinnerDiv}>
                        <CircularProgress size={80} thickness={2} />
                    </div>
                </DialogContent>
            </div>
        ) : (
            <div>
                <DialogTitle>Inbox: {name}</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <InboxTable />
                </DialogContent>
            </div>
        )

        return (
            <Fragment>
                <Button onClick={this.handleOpen} style={{ color: "#388e3c" }} variant="outlined">
                    <AllInboxIcon className={classes.buttonIcon} /> inbox
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="md">
                    <IconButton onClick={this.handleClose} className={classes.closeButton} size="small">
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

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(InboxDialog));

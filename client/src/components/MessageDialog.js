import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";

// MUI components
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import MailIcon from "@material-ui/icons/Mail";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

// Redux stuff
import { connect } from "react-redux";
import { markMessageRead, deleteMessage, getMessage } from "../redux/actions/mailboxActions";

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
    text1: {
        margin: "20px auto 0px 10px"
    },
    text2: {
        margin: "10px auto 0px 10px"
    },
    icon: {
        margin: "20px auto 0px 10px"
    },
    dialogContent: {
        height: 350
    },
    buttonIcon: {
        margin: "auto 5px auto auto"
    }
};

export class MessageDialog extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        const { messageId, userId, readStatus } = this.props;

        this.setState({ open: true });
        this.props.getMessage(messageId);

        if (!readStatus) {
            this.props.markMessageRead(messageId, userId);
        }
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete = () => {
        const { messageId, userId } = this.props;

        this.props.deleteMessage(messageId, userId);
        this.handleClose();
    };

    renderButton = () => {
        const { readStatus } = this.props;

        if (readStatus) {
            return (
                <IconButton onClick={this.handleOpen} style={{ color: "#388e3c" }} size="small">
                    <DraftsOutlinedIcon />
                </IconButton>
            )
        } else {
            return (
                <IconButton onClick={this.handleOpen} style={{ color: "#388e3c" }} size="small">
                    <MailIcon />
                </IconButton>
            )
        }
    };

    render() {
        const { classes, message, UI: { loading } } = this.props;

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
                <DialogTitle>{message.subject}</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Grid container>
                        <Grid item>
                            <AccountBoxIcon style={{ color: "#388e3c" }} className={classes.icon} />
                        </Grid>
                        <Grid item>
                            <Typography className={classes.text1} noWrap>{message.senderName}</Typography>
                        </Grid>
                        <Grid item>
                            <AlternateEmailIcon style={{ color: "#388e3c" }} className={classes.icon} />
                        </Grid>
                        <Grid item>
                            <Typography className={classes.text1} noWrap>{message.senderContact}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Typography className={classes.text1}>
                                <Box fontWeight="fontWeightBold" m={1}>Sent at: </Box>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.text1}>{dayjs(message.timestamp).format("h:mm a, MMMM DD YYYY")}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Typography className={classes.text2}>
                                <Box fontWeight="fontWeightBold" m={1}>Message: </Box>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.text2}>{message.message}</Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDelete} style={{ color: "#ef5350" }} variant="outlined">
                        <DeleteIcon className={classes.buttonIcon} />delete
                    </Button>
                </DialogActions>
            </div>)

        return (
            <Fragment>
                {this.renderButton()}
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
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
    message: state.mailbox.message,
    UI: state.UI
});

const mapActionsToProps = {
    markMessageRead,
    deleteMessage,
    getMessage
};

MessageDialog.propTypes = {
    markMessageRead: PropTypes.func.isRequired,
    deleteMessage: PropTypes.func.isRequired,
    getMessage: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
    messageId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    readStatus: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(MessageDialog));

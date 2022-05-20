import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

// Components
import ProfileButton from "./ProfileButton";
import EditProfile from "./EditProfile";
import SendMessageDialog from "./SendMessageDialog";
import InboxDialog from "./InboxDialog";

// MUI components
import {
    Dialog,
    DialogActions,
    Button,
    DialogContent,
    DialogTitle,
    CircularProgress,
    Grid,
    IconButton,
    Typography,
    Box
} from "@mui/material";
import {
    Delete as DeleteIcon,
    Group as GroupIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    Close as CloseIcon
} from "@mui/icons-material";

// Redux stuff
import { connect } from "react-redux";
import { getUser, deleteUser, clearErrors } from "../redux/actions/usersActions";

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
    icon: {
        margin: "5px 8px auto 15px"
    },
    statusText: {
        margin: "20px auto 0px 10px"
    },
    text2: {
        margin: "10px auto 0px 10px"
    },
    dialogContent: {
        height: 250
    },
    buttonIcon: {
        margin: "auto 5px auto auto"
    }
};

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export class ProfileDialog extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getUser(this.props.userId);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete = () => {
        this.props.deleteUser(this.props.userId);
        this.handleClose();
    };

    render() {
        const { user: { name, status, statusTime, phone, email, team, memo }, UI: { loading }, userId } = this.props;

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
                <DialogTitle>{name}</DialogTitle>
                <DialogContent sx={styles.dialogContent}>
                    <Grid container justify="flex-start">
                        <Grid item>
                            <Grid container alignItems="center" justify="center">
                                <Grid item><PhoneIcon color="secondary" sx={styles.icon} /></Grid>
                                <Grid item>
                                    <Typography>{phone}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justify="center">
                                <Grid item><EmailIcon color="secondary" sx={styles.icon} /></Grid>
                                <Grid item>
                                    <Typography>{email}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justify="center">
                                <Grid item><GroupIcon color="secondary" sx={styles.icon} /></Grid>
                                <Grid item>
                                    <Typography>{capitalize(String(team))}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Typography sx={styles.statusText}>
                                <Box fontWeight="fontWeightBold" m={1}>Status: </Box>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={styles.statusText} noWrap>{status}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Typography sx={styles.text2}>
                                <Box fontWeight="fontWeightBold" m={1}>Since: </Box>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={styles.text2}>{dayjs(statusTime).format("h:mm a, MMMM DD YYYY")}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Typography sx={styles.text2}>
                                <Box fontWeight="fontWeightBold" m={1}>Memo: </Box>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={styles.text2}>{memo}</Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {Boolean(parseInt(localStorage.admin)) && (
                        <Button onClick={this.handleDelete} style={{ color: "#ef5350" }} variant="outlined">
                            <DeleteIcon sx={styles.buttonIcon} />delete
                        </Button>)}
                    {!Boolean(parseInt(localStorage.viewOnly)) && (<InboxDialog userId={userId} onClose={this.handleClose} />)}
                    <SendMessageDialog userId={userId} onClose={this.handleClose} />
                    {!Boolean(parseInt(localStorage.viewOnly)) && (<EditProfile />)}
                </DialogActions>
            </div>
        )

        return (
            <Fragment>
                <ProfileButton onClick={this.handleOpen} unreadMessages={this.props.unreadMessages} />
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
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
    user: state.users.user,
    UI: state.UI
});

const mapActionsToProps = {
    getUser,
    deleteUser,
    clearErrors
};

ProfileDialog.propTypes = {
    deleteUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    userMemo: PropTypes.string.isRequired,
    unreadMessages: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(ProfileDialog);

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI components
import {
    TextField,
    Dialog,
    DialogActions,
    Button,
    DialogContent,
    DialogTitle,
    CircularProgress,
    IconButton
} from "@mui/material";

import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Send as SendIcon,
    Close as CloseIcon
} from "@mui/icons-material";

// Redux stuff
import { connect } from "react-redux";
import { getUser, updateStatus } from "../redux/actions/usersActions";

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
        margin: "1px 8px auto 8px"
    },
    statusText: {
        margin: "20px auto 0px 10px"
    },
    text2: {
        margin: "10px auto 0px 10px"
    },
    dialogContent: {
        height: 80
    },
    textField: {
        marginTop: 10
    }
};

export class EditStatus extends Component {
    state = {
        status: "",
        open: false
    };

    mapUserDetailsToState = (user) => {
        this.setState({
            status: this.checkUser(user),
            userId: this.props.userId
        });
    };

    checkUser = (user) => {
        if (this.props.userId === user.userId) {
            return user.status;
        }
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getUser(this.props.userId);
        this.mapUserDetailsToState(this.props.user);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        const { user } = this.props;
        this.mapUserDetailsToState(user);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const statusData = {
            status: this.state.status,
            statusTime: new Date().toString(),
            userId: this.state.userId
        };
        this.props.updateStatus(this.props.userId, statusData);
        this.handleClose();
    };

    handleDelete = (event) => {
        event.preventDefault();
        const statusData = {
            status: "",
            statusTime: new Date().toString(),
            userId: this.state.userId
        };
        this.props.updateStatus(this.props.userId, statusData);
        this.handleClose();
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { classes, user: { name, status }, UI: { loading } } = this.props;

        const dialogMarkup = loading ? (
            <>
                <DialogTitle>Loading...</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <div className={classes.spinnerDiv}>
                        <CircularProgress size={40} thickness={2} />
                    </div>
                </DialogContent>
            </>
        ) : (
            <>
                <DialogTitle>Edit {name}"s status</DialogTitle>
                <form>
                    <DialogContent className={classes.dialogContent}>

                        <TextField
                            id="status"
                            name="status"
                            type="status"
                            variant="filled"
                            size="small"
                            fullWidth
                            placeholder={status}
                            value={this.state.status}
                            onChange={this.handleChange}
                            className={classes.textField} />
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ color: "#ef5350" }} variant="outlined" onClick={this.handleDelete}>
                            <DeleteIcon className={classes.icon} />clear
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={this.handleSubmit} type="submit">
                            <SendIcon className={classes.icon} />submit
                        </Button>
                    </DialogActions>
                </form>
            </>
        )

        return (
            <Fragment>
                <IconButton onClick={this.handleOpen} size="small">
                    <EditIcon />
                </IconButton>
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
    UI: state.UI,
    user: state.users.user,
    users: state.users.users
});

const mapActionsToProps = {
    getUser,
    updateStatus
};

EditStatus.propTypes = {
    getUser: PropTypes.func.isRequired,
    updateStatus: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditStatus));

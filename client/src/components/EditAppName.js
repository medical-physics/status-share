import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI components
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";

// Redux stuff
import { connect } from "react-redux";
import { setAppName } from "../redux/actions/accountActions";

const styles = {
    closeButton: {
        textAlign: "center",
        position: "absolute",
        left: "90%",
        marginTop: 7
    },
    icon: {
        margin: "5px 8px auto 15px"
    },
    dialogContent: {
        height: 80
    },
    textField: {
        marginTop: 10
    }
};

export class EditAppName extends Component {
    state = {
        appName: "",
        open: false
    };

    handleOpen = () => {
        this.setState({
            appName: this.props.appName,
            open: true
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const newAppName = {
            appName: this.state.appName
        };
        this.props.setAppName(newAppName);
        this.handleClose();
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { classes, appName } = this.props;

        return (
            <Fragment>
                <IconButton onClick={this.handleOpen} size="small" style={{ color: "#ffffff" }}>
                    <EditIcon />
                </IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <IconButton onClick={this.handleClose} className={classes.closeButton} size="small">
                        <CloseIcon />
                    </IconButton>
                    <DialogTitle>Change web app name</DialogTitle>
                    <form>
                        <DialogContent className={classes.dialogContent}>

                            <TextField
                                id="appName"
                                name="appName"
                                type="appName"
                                variant="filled"
                                size="small"
                                fullWidth
                                placeholder={appName}
                                value={this.state.appName}
                                onChange={this.handleChange}
                                className={classes.textField} />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" color="secondary" onClick={this.handleSubmit} type="submit">
                                <SendIcon className={classes.icon} />submit
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Fragment>
        )
    };
}

const mapStateToProps = (state) => ({
    appName: state.account.appName
});

const mapActionsToProps = {
    setAppName
};

EditAppName.propTypes = {
    appName: PropTypes.string.isRequired,
    setAppName: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditAppName));

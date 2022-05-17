import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// MUI components
import {
    Dialog,
    DialogActions,
    Button,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField
} from "@mui/material";

import {
    Edit as EditIcon,
    Send as SendIcon,
    Close as CloseIcon
} from "@mui/icons-material";

// Redux stuff
import { connect } from "react-redux";
import { editProfile } from "../redux/actions/usersActions";

const styles = {
    closeButton: {
        textAlign: "center",
        position: "absolute",
        left: "92%",
        marginTop: 7
    },
    icon: {
        margin: "auto 5px auto auto"
    },
    dialogContent: {
        textAlign: "center",
        height: 280
    },
    memo: {
        marginTop: 30
    },
    otherText: {
        marginTop: 8
    },
    shortText: {
        marginTop: 8,
        marginRight: 15,
        width: 250
    }
};

export class EditProfile extends Component {
    state = {
        name: "",
        phone: "",
        email: "",
        team: "",
        memo: "",
        priority: "",
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserToState();
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    mapUserToState = () => {
        this.setState({
            name: this.props.user.name,
            phone: this.props.user.phone,
            email: this.props.user.email,
            team: this.props.user.team,
            memo: this.props.user.memo,
            priority: this.props.user.priority,
            userId: this.props.user.userId
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const profileData = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            team: this.state.team.trim(),
            memo: this.state.memo,
            userId: this.state.userId,
            priority: parseInt(this.state.priority)
        };
        this.props.editProfile(this.props.user.userId, profileData);
        this.handleClose();
    };

    render() {
        const { user: { name, phone, email, memo, priority } } = this.props;
        return (
            <Fragment>
                <Button onClick={this.handleOpen} variant="outlined" color="secondary">
                    <EditIcon sx={styles.icon} />  edit
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <IconButton onClick={this.handleClose} sx={styles.closeButton} size="small">
                        <CloseIcon />
                    </IconButton>
                    <DialogTitle>
                        Edit {name}"s profile
                    </DialogTitle>
                    <form>
                        <DialogContent sx={styles.dialogContent}>
                            <Grid container>
                                <Grid item>
                                    <TextField
                                        id="phone"
                                        name="phone"
                                        type="phone"
                                        label="Phone"
                                        placeholder={phone}
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                        sx={styles.shortText}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="email"
                                        name="email"
                                        type="email"
                                        label="Email"
                                        placeholder={email}
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        sx={styles.shortText}
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                id="memo"
                                name="memo"
                                type="memo"
                                label="Memo"
                                variant="filled"
                                multiline
                                rows="2"
                                placeholder={memo}
                                value={this.state.memo}
                                onChange={this.handleChange}
                                fullWidth
                                sx={styles.memo}
                            />
                            {Boolean(parseInt(localStorage.admin)) && (
                                <>
                                    <TextField
                                        name="name"
                                        label="Name"
                                        placeholder={name}
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        fullWidth
                                        sx={styles.otherText}
                                    />
                                    <TextField
                                        id="priority"
                                        name="priority"
                                        type="priority"
                                        label="Priority (e.g. 1)"
                                        placeholder={priority}
                                        value={this.state.priority}
                                        onChange={this.handleChange}
                                        fullWidth
                                        sx={styles.otherText}
                                    />
                                </>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleSubmit} variant="outlined" color="secondary" type="submit">
                                <SendIcon sx={styles.icon} />submit
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Fragment>
        )
    };
}

const mapStateToProps = (state) => ({
    user: state.users.user
});

const mapActionsToProps = {
    editProfile
};

EditProfile.propTypes = {
    editProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(EditProfile);

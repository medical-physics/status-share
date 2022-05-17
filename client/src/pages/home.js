import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import jwtDecode from "jwt-decode";
import { Helmet } from "react-helmet"
import axios from "axios";

// Components
import NavBar from "../components/NavBar";
import UpdateBar from "../components/UpdateBar";
import TeamTable from "../components/TeamTable";
import LoadingTable from "../components/LoadingTable";

// MUI Components
import {
    Grid,
    Box,
    Dialog,
    DialogTitle,
    Typography,
    CircularProgress
} from "@mui/material";

// Redux stuff
import { connect } from "react-redux";
import store from "../redux/store";
import { getUsers } from "../redux/actions/usersActions";
import { getTeams } from "../redux/actions/teamsActions";
import { logoutUser, refreshToken } from "../redux/actions/accountActions";
import { SET_AUTHENTICATED } from "../redux/types";

const styles = {
    table: {
        width: 482,
        margin: 15
    },
    spinnerdiv: {
        margin: "auto 10px auto 15px"
    },
    spinnertext: {
        margin: "auto auto 10px auto"
    },
    dialog: {
        width: 210
    },
    dummy: {
        width: 482,
        height: 20,
        margin: 15
    }
};

export class home extends Component {
    state = {
        teams: {}
    };

    componentDidMount() {
        const token = localStorage.FBIdToken;
        const rememberMe = localStorage.rememberMe;

        // If "Remember Me" is selected
        // Token refresher – ensures token is always valid while logged in
        if (rememberMe == 1) {
            store.dispatch({ type: SET_AUTHENTICATED });
            axios.defaults.headers.common["Authorization"] = token;
            if (token) {
                const decodedToken = jwtDecode(token);
                // If token expired, refresh token
                if (decodedToken.exp * 1000 < Date.now()) {
                    store.dispatch(refreshToken());
                    setTimeout(() => {
                        this.countdownAndRefresh();
                    }, 4000)
                    // If token valid, set timer until expiry and then refresh token
                } else {
                    this.countdownAndRefresh();
                }
                // If token doesn"t exist for some reason, retrieves new token
            } else {
                store.dispatch(refreshToken());
                setTimeout(() => {
                    this.countdownAndRefresh();
                }, 4000)
            }

        // If "Remember Me" not selected, logout user when token expires
        } else if (rememberMe == 0) {
            store.dispatch({ type: SET_AUTHENTICATED });
            axios.defaults.headers.common["Authorization"] = token;
            if (token) {
                const decodedToken = jwtDecode(token);
                const timeUntilExpiry = decodedToken.exp * 1000 - Date.now();
                if (timeUntilExpiry <= 0) {
                    store.dispatch(logoutUser());
                    window.location.href = "/login";
                } else {
                    setTimeout(() => {
                        store.dispatch(logoutUser());
                        window.location.href = "/login";
                    }, timeUntilExpiry);
                }
            } else {
                /* store.dispatch(logoutUser());
                window.location.href = "/login"; */
            }

        }

        this.props.getTeams();
        this.props.getUsers();
    };

    countdownAndRefresh = () => {
        const currentDecodedToken = jwtDecode(localStorage.FBIdToken);
        const currentTimeUntilExpiry = currentDecodedToken.exp * 1000 - Date.now();
        console.log(currentTimeUntilExpiry);
        setTimeout(() => {
            this.props.refreshToken();
            setTimeout(() => {
                this.countdownAndRefresh();
            }, 4000)
        }, currentTimeUntilExpiry);
    };

    render() {
        const { users, teams, loadingUsersData, loadingTeamsData, appName, loadingTeam, loadingUser } = this.props;
        const { classes } = this.props;

        const teamsObj = {};
        const teamsFields = {};

        this.props.teams.map((team) => {
            teamsObj[team.teamId] = [];
            teamsFields[team.teamId] = team;
        });

        this.props.teams.map((team) => {
            users.map((user) => {
                if (user.teamId === team.teamId) {
                    teamsObj[team.teamId].push(user)
                }
            });
        });

        return (
            <div>
                <Helmet>
                    <title>{appName} | Home</title>
                </Helmet>
                <Dialog open={loadingTeam}>
                    <DialogTitle>
                        <Grid className={classes.dialog}>
                            <Typography variant="overline" className={classes.spinnertext}>Updating teams...</Typography>
                            <CircularProgress size={20} className={classes.spinnerdiv} />
                        </Grid>
                    </DialogTitle>
                </Dialog>
                <Dialog open={loadingUser}>
                    <DialogTitle>
                        <Grid className={classes.dialog}>
                            <Typography variant="overline" className={classes.spinnertext}>Adding user...</Typography>
                            <CircularProgress size={20} className={classes.spinnerdiv} />
                        </Grid>
                    </DialogTitle>
                </Dialog>
                <Grid container justify="center">
                    <UpdateBar />
                    <NavBar />
                    {loadingUsersData || loadingTeamsData ?
                        <>
                            <Grid item className={classes.table}>
                                <LoadingTable />
                            </Grid>
                            <Grid item className={classes.table}>
                                <LoadingTable />
                            </Grid>
                            <Grid item className={classes.table}>
                                <LoadingTable />
                            </Grid>
                            <Grid item className={classes.table}>
                                <LoadingTable />
                            </Grid>
                            <Grid item className={classes.table}>
                                <LoadingTable />
                            </Grid>
                            <Grid item className={classes.table}>
                                <LoadingTable />
                            </Grid>
                            <Grid item className={classes.table}>
                                <LoadingTable />
                            </Grid>
                            <Grid item className={classes.table}>
                                <LoadingTable />
                            </Grid>
                        </>
                        : <>
                            {teams.map((team) => {
                                return (
                                    <Box order={teamsFields[team.teamId].priority} className={classes.table}>
                                        <TeamTable teamMembers={teamsObj[team.teamId]} teamsFields={teamsFields[team.teamId]} />
                                    </Box>)
                            })}
                            <Box order={99} className={classes.dummy}></Box>
                        </>}
                </Grid>
            </div>
        )
    };
}

const mapStateToProps = (state) => ({
    users: state.users.users,
    teams: state.teams.teams,
    loadingUsersData: state.users.loadingUsersData,
    loadingTeamsData: state.teams.loadingTeamsData,
    appName: state.account.appName,
    loadingTeam: state.UI.loadingTeam,
    loadingUser: state.UI.loadingUser
});

const mapActionsToProps = {
    getUsers,
    getTeams,
    refreshToken
};

home.propTypes = {
    getTeams: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    loadingTeam: PropTypes.bool.isRequired,
    loadingTeamsData: PropTypes.bool.isRequired,
    loadingUsersData: PropTypes.bool.isRequired,
    teams: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));

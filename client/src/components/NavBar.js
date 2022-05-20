import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import EditAppName from "./EditAppName";
import AddTeamDialog from "./AddTeamDialog";

// MUI components
import {
    AppBar,
    Toolbar,
    Button,
    Grid,
    IconButton,
    Typography
} from "@mui/material";
import {
    CheckCircleOutline as CheckCircleOutlineIcon
} from "@mui/icons-material";


// Redux stuff
import { connect } from "react-redux";
import { logoutUser, getAppName, truncateAppName, detruncateAppName } from "../redux/actions/accountActions";

export class NavBar extends Component {

    constructor(props) {
        super(props);
        this.updateTitle = this.updateTitle.bind(this);
    };

    componentDidMount() {
        this.props.getAppName();
        this.updateTitle();
        window.addEventListener("resize", this.updateTitle);
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateTitle);
    };

    updateTitle = () => {
        if (window.innerWidth < 550) {
            this.props.truncateAppName();
        } else {
            this.props.detruncateAppName();
        }
    };

    handleLogout = () => {
        localStorage.removeItem("admin");
        this.props.logoutUser();
    };

    render() {
        const { authenticated, appName, admin, truncatedAppName } = this.props;
        const title = truncatedAppName ? (
            <Typography noWrap style={{ margin: "0px 0px 0px 5px" }} variant="overline">
                {appName.slice(0, 12).concat("...")}
            </Typography>
        ) : (
            <Typography noWrap style={{ margin: "0px 0px 0px 5px" }} variant="overline">
                {appName}
            </Typography>
        )
        return (
            <AppBar style={{ maxHeight: 50 }}>
                <Toolbar variant="dense">
                    <Grid justify="space-between" alignItems="center" container>
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <IconButton size="small">
                                        <CheckCircleOutlineIcon style={{ color: "#ffffff" }} />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    {title}
                                </Grid>
                                <Grid item>
                                    {(Boolean(parseInt(localStorage.admin)) || admin) && (<><EditAppName /><AddTeamDialog /></>)}
                                </Grid>
                            </Grid>
                        </Grid>
                        {authenticated && (
                            <Grid item>
                                <Button onClick={this.handleLogout} color="inherit" variant="outlined" size="small" component={Link} to="/login">
                                    Sign Out
                                </Button>
                            </Grid>)}
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    };
}

const mapStateToProps = (state) => ({
    authenticated: state.account.authenticated,
    admin: state.account.admin,
    appName: state.account.appName,
    truncatedAppName: state.account.truncatedAppName
});

const mapActionsToProps = {
    logoutUser,
    getAppName,
    truncateAppName,
    detruncateAppName
};

NavBar.propTypes = {
    admin: PropTypes.bool.isRequired,
    appName: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
    detruncateAppName: PropTypes.func.isRequired,
    getAppName: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    truncateAppName: PropTypes.func.isRequired,
    truncatedAppName: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(NavBar);

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles"
import PropTypes from "prop-types";
import { Helmet } from "react-helmet"

// Components
import AppIcon from "../images/icon.png";
import BottomBar from "../components/BottomBar";
import NavBar from "../components/NavBar";

// MUI components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// Redux stuff
import { connect } from "react-redux";
import { loginUser, getAppName, persistentLogin } from "../redux/actions/accountActions";
import store from "../redux/store";
import { REMEMBER_ME } from "../redux/types";

const styles = {
    form: {
        margin: "150px auto auto auto",
        textAlign: "center"
    },
    pageTitle: {
        margin: "20px auto 20px auto"
    },
    textField: {
        margin: "20px auto auto auto",
        width: 300
    },
    button: {
        margin: "30px 10px 30px 10px"
    },
    customError: {
        color: "red",
        fonstSize: "0.8rem"
    },
    image: {
        width: 45,
        height: 45,
        margin: "auto 15px auto auto"
    },
    checkbox: {
        margin: "30px 20px 30px 20px"
    }
};

export class login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            loading: false,
            rememberMe: false,
            errors: {}
        };
    };

    componentDidMount() {
        localStorage.setItem("admin", 0);
        localStorage.setItem("viewOnly", 0);
        this.props.getAppName();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        };
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email.trim().toLowerCase().concat("@bccancer.bc.ca"),
            password: this.state.password
        };

        // Login persistence or not
        if (this.state.rememberMe) {
            this.props.persistentLogin(userData, this.props.history);
            localStorage.setItem("rememberMe", 1);
            store.dispatch({ type: REMEMBER_ME });
        } else {
            this.props.loginUser(userData, this.props.history);
            localStorage.setItem("rememberMe", 0);
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleCheck = (event) => {
        this.setState({
            [event.target.name]: event.target.checked
        });
    };

    render() {
        const { classes, UI: { loading }, appName } = this.props;
        const { errors } = this.state;

        return (
            <div>
                <Helmet>
                    <title>{appName} | Login</title>
                </Helmet>
                <Grid container className={classes.form} justify="center">
                    <NavBar />
                    <Grid item sm />
                    <Grid item sm>
                        <Paper elevation={3}>
                            <Grid container alignItems="center" justify="center">
                                <Grid item>
                                    <img src={AppIcon} className={classes.image} alt="Status Share" />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4" className={classes.pageTitle}>
                                        Sign In
                                    </Typography>
                                </Grid>
                            </Grid>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <TextField
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Username"
                                    className={classes.textField}
                                    helperText={errors.email}
                                    error={errors.email ? true : false}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    className={classes.textField}
                                    helperText={errors.password}
                                    error={errors.password ? true : false}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                {errors.general && (
                                    <Typography variant="body2" className={classes.customError}>
                                        {errors.general}
                                    </Typography>
                                )}
                                <Grid className={classes.textField}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        disabled={loading}
                                    >
                                        Login
                                        {loading && (
                                            <CircularProgress size={30} className={classes.progress} />
                                        )}
                                    </Button>
                                    <FormControlLabel
                                        control={<Checkbox
                                            name="rememberMe"
                                            checked={this.state.rememberMe}
                                            onChange={this.handleCheck}
                                            color="primary" />}
                                        label="Remember Me"
                                        className={classes.checkbox}
                                    />
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item sm />
                    <BottomBar />
                </Grid>
            </div>
        )
    };
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    appName: state.account.appName
});

const mapActionsToProps = {
    loginUser,
    getAppName,
    persistentLogin
};

login.propTypes = {
    appName: PropTypes.string.isRequired,
    getAppName: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    persistentLogin: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));

import React from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const HomeRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            authenticated === false && localStorage.rememberMe !== 1 ? <Navigate to="/login" /> : <Component {...props} />
        }
    />
);

const mapStateToProps = (state) => ({
    authenticated: state.account.authenticated
});

HomeRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(HomeRoute);

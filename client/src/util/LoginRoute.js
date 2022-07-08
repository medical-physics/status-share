import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LoginRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      <Component {...props} />}
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.account.authenticated
});

LoginRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(LoginRoute);

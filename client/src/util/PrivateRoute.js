import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const authenticated = useSelector((state) => state.account.authenticated);

  return (authenticated === false && localStorage.rememberMe !== 1) ?
    <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;

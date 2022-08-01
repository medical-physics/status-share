import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const authenticated = useSelector((state) => state.account.authenticated);
  const checkingAuth = useSelector((state) => state.account.checkingAuth);

  return (checkingAuth === false && authenticated === false && !localStorage.getItem('refreshToken'))
    ? <Navigate to='/login' />
    : <Outlet />;
};

export default PrivateRoute;

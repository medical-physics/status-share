import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const LoginRoute = () => {
  const authenticated = useSelector((state) => state.account.authenticated);

  return (authenticated === true)
    ? <Navigate to='/' />
    : <Outlet />;
};

export default LoginRoute;

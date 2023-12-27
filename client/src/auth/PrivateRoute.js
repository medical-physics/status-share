import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Condition for logging users out immediately once session has ended
  return !localStorage.getItem("refreshToken") ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;

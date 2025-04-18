import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    // If there's no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If the user role doesn't match, redirect to login
    if (allowedRole && userRole !== allowedRole) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

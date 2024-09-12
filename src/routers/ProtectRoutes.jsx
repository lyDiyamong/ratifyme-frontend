import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, role, allowedRoles }) => {
    // Check if the user has the required role
    return allowedRoles.includes(role) ? Component : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;

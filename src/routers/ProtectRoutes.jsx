// React library import
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, role, allowedRoles }) => {
    // Only render the element if the user's role is allowed
    return allowedRoles.includes(role) ? element : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;

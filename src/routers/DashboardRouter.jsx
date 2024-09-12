import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/dasboard";
import routesConfig from "./RoutesConfig";
import ProtectedRoute from "./protectRoutes";

const userRole = "earner";
const DashbaordRouter = () => {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                {routesConfig.map(({ path, component: Component, roles }) => (
                    <Route
                        key={path}
                        path={path}
                        element={<ProtectedRoute element={<Component />} role={userRole} allowedRoles={roles} />}
                    />
                ))}
                {/* <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="*" element={<NotFoundPage />} /> */}
            </Route>
        </Routes>
    );
};

export default DashbaordRouter;

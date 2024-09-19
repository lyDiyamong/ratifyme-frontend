import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/dasboard";
import routesConfig from "./RoutesConfig";
import ProtectedRoute from "./protectRoutes";
import Dashboard from "../pages/dashboard";
import BadgeManagement from "../pages/badgeMangements";
import EarnerManagement from "../pages/earnerManagements";
import IssuerManagement from "../pages/issuerManagements";
import ServicePlanManagement from "../pages/ServicePlanManagement";
import BillingInvoiceManagement from "../pages/billingInvoiceManagement";
import Report from "../pages/report";
import AccountManagement from "../pages/setting/accountManagement";
import PrivacySecurityManagement from "../pages/setting/privacyManagement";
import BackpackManagement from "../pages/backpackManagement";
import NotFoundPage from "../pages/NotFoundPage";
import InvoiceManagement from "../pages/invoice";


const userRole = "earner";
const DashbaordRouter = () => {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                {/* {routesConfig.map(({ path, component: Component, roles }) => (
                    <Route
                        key={path}
                        path={path}
                        element={<ProtectedRoute element={<Component />} role={userRole} allowedRoles={roles} />}
                    />
                ))} */}
                {/* <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="*" element={<NotFoundPage />} /> */}

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/management/badges" element={<BadgeManagement />} />
                <Route path="/management/issuers" element={<IssuerManagement />} />
                <Route path="/management/earners" element={<EarnerManagement />} />
                <Route path="/sales/servicePlan" element={<ServicePlanManagement />} />
                <Route path="/sales/billing&invoice" element={<BillingInvoiceManagement />} />
                <Route path="/sales/invoice" element={<InvoiceManagement />} />
                <Route path="/reports" element={<Report />} />
                <Route path="/mybackpacks" element={<BackpackManagement />} />
                <Route path="/setting/account" element={<AccountManagement />} />
                <Route path="/setting/privacy&security" element={<PrivacySecurityManagement />} />

            </Route>
        </Routes>
    );
};

export default DashbaordRouter;

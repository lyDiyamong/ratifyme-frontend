import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/dasboard";
import Dashboard from "../pages/dasboard";
import BadgeManagement from "../pages/badgeMangements";
import EarnerManagement from "../pages/earnerManagements";
import IssuerManagement from "../pages/issuerManagements";
import ServicePlanManagement from "../pages/ServicePlanManagement";
import BillingInvoiceManagement from "../pages/billingInvoiceManagement";
import Report from "../pages/report";
import AccountManagement from "../pages/setting/accountManagement";
import PrivacySecurityManagement from "../pages/setting/privacyManagement";

const DashbaordRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />}/>
                    <Route path="/management/badges" element={<BadgeManagement />}/>
                    <Route path="/management/issuers" element={<IssuerManagement />}/>
                    <Route path="/management/eaners" element={<EarnerManagement />}/>
                    <Route path="/sales/servicePlan" element={<ServicePlanManagement />}/>
                    <Route path="/sales/billing&invoice" element={<BillingInvoiceManagement />}/>
                    <Route path="/reports" element={<Report />}/>
                    <Route path="/setting/account" element={<AccountManagement />}/>
                    <Route path="/setting/privacy&security" element={<PrivacySecurityManagement />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default DashbaordRouter;

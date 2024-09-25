import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/dasboard";
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
import BadgeCreation from "../pages/badgeMangements/BadgeCreation";
import AddRecipient from "../pages/earnerManagements/AddRecipient";
import BadgeDetail from "../pages/badgeMangements/BadgeDetail";
import InstitutionManagement from "../pages/institutionManagement";
import InstitutionDetail from "../pages/institutionDetail";

const DashbaordRouter = () => {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
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
                <Route path="/management/eaners/add-earners" element={<AddRecipient />} />
                <Route path="/management/institutions" element={<InstitutionManagement />} />
                <Route path="/management/institutions/:institutionId" element={<InstitutionDetail />} />
                {/* <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="*" element={<NotFoundPage />} /> */}
                <Route path="/management/badges/badgecreation" element={<BadgeCreation />} />
                <Route path="/management/badges/badgeDetail/:id" element={<BadgeDetail />} />
            </Route>
        </Routes>
    );
};

export default DashbaordRouter;

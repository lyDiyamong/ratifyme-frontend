// React library import
import { Route, Routes } from "react-router-dom";

// Custom import
import DashboardLayout from "../layouts/dasboard";
import Dashboard from "../pages/dashboard";
import BadgeManagement from "../pages/badgeMangements";
import EarnerManagement from "../pages/earnerManagements";
import IssuerManagement from "../pages/issuerManagements";
import ServicePlanManagement from "../pages/ServicePlanManagement";
import BillingInvoiceManagement from "../pages/billingInvoiceManagement";
import Report from "../pages/report";
import AccountManagement from "../pages/accountManagement/index";
import BackpackManagement from "../pages/backpackManagement";
import InvoiceManagement from "../pages/invoice";
import BadgeCreation from "../pages/badgeMangements/BadgeCreation";
import BadgeDetail from "../pages/badgeMangements/badgeDetail";
import InstitutionManagement from "../pages/institutionManagement";
import InstitutionDetail from "../pages/institutionDetail";
import IssuerDetail from "../pages/issuerDetail";
import AchievementManagement from "../pages/achievement";
import EditBadge from "../pages/badgeMangements/editBadge";
import Organization from "../pages/organization";
import OrganizationInfo from "../pages/accountManagement/organizationInfo";
import NotFoundPage from "../pages/notFound";

const DashbaordRouter = () => {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/management/badges" element={<BadgeManagement />} />
                <Route path="/management/issuers" element={<IssuerManagement />} />
                <Route path="/management/earners" element={<EarnerManagement />} />
                <Route path="/sales/servicePlan" element={<ServicePlanManagement />} />
                <Route path="/sales/billing&invoice" element={<BillingInvoiceManagement />} />
                <Route path="/sales/invoice" element={<InvoiceManagement />} />
                <Route path="/reports" element={<Report />} />
                <Route path="/mybackpacks" element={<BackpackManagement />} />
                <Route path="/setting/account" element={<AccountManagement />} />
                <Route path="/management/institutions" element={<InstitutionManagement />} />
                <Route path="/management/institutions/:institutionId" element={<InstitutionDetail />} />
                <Route path="/management/issuer/:issuerId" element={<IssuerDetail />} />
                <Route path="/management/badges/badgecreation" element={<BadgeCreation />} />
                <Route path="/management/badges/badgeDetail/:id" element={<BadgeDetail />} />
                <Route path="/myachievement" element={<AchievementManagement />} />
                <Route path="/management/badges/editBadge/:id" element={<EditBadge />} />
                <Route path="/organization" element={<Organization />} />
                <Route path="/organizations/:id" element={<OrganizationInfo />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default DashbaordRouter;

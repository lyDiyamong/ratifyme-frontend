import BackpackManagement from "../pages/backpackManagement";
import BadgeManagement from "../pages/badgeMangements";
import BillingInvoiceManagement from "../pages/billingInvoiceManagement";
import Dashboard from "../pages/dashboard";
import EarnerManagement from "../pages/earnerManagements";
import IssuerManagement from "../pages/issuerManagements";
import Report from "../pages/report";
import ServicePlanManagement from "../pages/ServicePlanManagement";
import AccountManagement from "../pages/setting/accountManagement";
import PrivacySecurityManagement from "../pages/setting/privacyManagement";

// routesConfig.js
const routesConfig = [
    { path: "/dashboard", component: Dashboard, roles: ["institution", "issuer", "earner"] },
    { path: "/management/badges", component: BadgeManagement, roles: ["institution", "issuer"] },
    { path: "/management/issuers", component: IssuerManagement, roles: ["institution", "issuer"] },
    { path: "/management/earners", component: EarnerManagement, roles: ["institution", "issuer"] },
    { path: "/sales/servicePlan", component: ServicePlanManagement, roles: ["institution", "issuer"] },
    { path: "/sales/billing&invoice", component: BillingInvoiceManagement, roles: ["institution", "issuer"] },
    { path: "/reports", component: Report, roles: ["issuer"] },
    { path: "/mybackpacks", component: BackpackManagement, roles: ["earner"] },
    { path: "/setting/account", component: AccountManagement, roles: ["issuer"] },
    { path: "/setting/privacy&security", component: PrivacySecurityManagement, roles: ["issuer"] },
];

export default routesConfig;

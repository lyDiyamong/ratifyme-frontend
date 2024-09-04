import DashboardIconSvg from "../assets/icons/dashboard.svg";
import ManagementIconSvg from "../assets/icons/management.svg";
import SaleIconSvg from "../assets/icons/sales.svg";
import Report from "../assets/icons/report.svg";
import Setting from "../assets/icons/setting.svg";
import Logout from "../assets/icons/logout.svg";

// Navigation Items
export const sidebarItems = [
    {
        text: "Dashboard",
        icon: DashboardIconSvg,
        path: "/dashboard",
        altText: "Dashboard icon",
    },
    {
        text: "Managements",
        icon: ManagementIconSvg,
        dropdown: true,
        subItems: [
            {
                text: "Badges",
                path: "/management/badges",
            },
            {
                text: "Issuers",
                path: "/management/issuers",
            },
            {
                text: "Earners",
                path: "/management/eaners",
            },
        ],
    },
    {
        text: "Sales and Billing",
        icon: SaleIconSvg,
        dropdown: true,
        subItems: [
            {
                text: "Service Plans",
                path: "/sales/servicePlan",
            },
            {
                text: "Billing and Invoice",
                path: "/sales/billing&invoice",
            },
        ],
    },
    {
        text: "Reports",
        icon: Report,
        path: "/reports",
        altText: "Reports icon",
    },
    {
        text: "Settings",
        icon: Setting,
        dropdown: true,
        subItems: [
            {
                text: "Account",
                path: "/setting/account",
            },
            {
                text: "Privacy & Security",
                path: "/setting/privacy&security",
            },
        ],
    },
    {
        text: "Logout",
        icon: Logout,
        path: "/logout",
    },
];
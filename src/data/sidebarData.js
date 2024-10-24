// Custom import
import DashboardIconSvg from "../assets/icons/dashboard.svg";
import ManagementIconSvg from "../assets/icons/management.svg";
import SaleIconSvg from "../assets/icons/sales.svg";
import BackpackIconSvg from "../assets/icons/backpack.svg";
import ReportIconSvg from "../assets/icons/report.svg";
import SettingIconSvg from "../assets/icons/setting.svg";
import LogoutIconSvg from "../assets/icons/logout.svg";
import AchievementIconSvg from "../assets/icons/achievements.svg";
import OrganizationIconSvg from "../assets/icons/OrganizationSvg.svg";

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
                path: "/dashboard/management/badges",
                roles: [1, 2, 3],
            },
            {
                text: "Institutions",
                path: "/dashboard/management/institutions",
                roles: [1],
            },
            {
                text: "Issuers",
                path: "/dashboard/management/issuers",
                roles: [1, 2],
            },
            {
                text: "Earners",
                path: "/dashboard/management/earners",
                roles: [1, 2, 3],
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
                path: "dashboard/sales/servicePlan",
                roles: [1],
            },
            {
                text: "Billing and Invoice",
                path: "dashboard/sales/billing&invoice",
                roles: [1],
            },
            {
                text: "Invoices",
                path: "dashboard/sales/invoice",
                roles: [2],
            },
        ],
    },
    {
        text: "Reports",
        icon: ReportIconSvg,
        path: "/dashboard/reports",
        altText: "Reports icon",
        roles: [1, 2],
    },
    {
        text: "My Achievement",
        icon: AchievementIconSvg,
        path: "/dashboard/myachievement",
        altText: "Backpack icon",
        roles: [4],
    },
    {
        text: "My Backpacks",
        icon: BackpackIconSvg,
        path: "/dashboard/mybackpacks",
        altText: "Backpack icon",
        roles: [4],
    },
    {
        text: "Organization",
        icon: OrganizationIconSvg,
        path: "/dashboard/organization",
        altText: "Organization icon",
        roles: [3],
    },
    {
        text: "Settings",
        icon: SettingIconSvg,
        dropdown: true,
        subItems: [
            {
                text: "Account",
                path: "/dashboard/setting/account",
            },
        ],
    },
    {
        text: "Logout",
        icon: LogoutIconSvg,
        path: "/logout",
    },
];

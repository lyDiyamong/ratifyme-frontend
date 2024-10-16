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
                path: "/management/badges",
                roles: [1, 2, 3],
            },
            {
                text: "Institutions",
                path: "/management/institutions",
                roles: [1],
            },
            {
                text: "Issuers",
                path: "/management/issuers",
                roles: [1, 2],
            },
            {
                text: "Earners",
                path: "/management/earners",
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
                path: "/sales/servicePlan",
                roles: [1, 2],
            },
            {
                text: "Billing and Invoice",
                path: "/sales/billing&invoice",
                roles: [1, 2],
            },
        ],
    },
    {
        text: "Reports",
        icon: ReportIconSvg,
        path: "/reports",
        altText: "Reports icon",
        roles: [1, 2],
    },
    {
        text: "My Achievement",
        icon: AchievementIconSvg,
        path: "/myachievement",
        altText: "Backpack icon",
        roles: [4],
    },
    {
        text: "My Backpacks",
        icon: BackpackIconSvg,
        path: "/mybackpacks",
        altText: "Backpack icon",
        roles: [4],
    },
    {
        text: "Organization",
        icon: OrganizationIconSvg,
        path: "/organization",
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
                path: "/setting/account",
            },
        ],
    },
    {
        text: "Logout",
        icon: LogoutIconSvg,
        path: "/logout",
    },
];

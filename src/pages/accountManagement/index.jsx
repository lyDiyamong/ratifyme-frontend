// React import
import { useState } from "react";
import { useSelector } from "react-redux";

// MUI import
import { Tabs, Tab } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { BusinessRounded, SchoolRounded } from "@mui/icons-material";

// Custom import
import UserProfile from "./userProfile/index";
import ChangePasswordForm from "./changePassword/";
import OrganizationInfo from "./organizationInfo";
import AcademicBackground from "./academicBackground";
import PageTitle from "../../components/PageTitle";
import DashboardContainer from "../../components/styles/DashboardContainer";

// API import
import { useFetchInfoUserByIdQuery } from "../../store/api/users/userInfoProfileApi";

// =========== Start Account Management ===========
const AccountManagement = () => {
    const { userId } = useSelector((state) => state.global);
    const [value, setValue] = useState(0);
    const { data: info } = useFetchInfoUserByIdQuery(userId, { skip: !userId });

    const userData = info?.data;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // 1 = role Admin, 2 = role Institution Owner, 3 = role Issuer, 4 = role Earner
    const userRole = userData?.Role.id;
    const isDisabled = userRole === 3 || userRole === 2 || userRole === 1;
    const orgInfoDisabled = userRole === 3 || userRole === 4 || userRole === 1;

    return (
        <DashboardContainer sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
            <PageTitle title="My Profile" subtitle="View and update your personal information and account settings." />

            {/* Tabs for User Profile, Bio Content, and Settings */}
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                variant="scrollable"
                scrollButtons="auto"
            >
                <Tab icon={<PersonIcon />} label="Profile" iconPosition="start" sx={{ textTransform: "none" }} />
                {!orgInfoDisabled && (
                    <Tab
                        icon={<BusinessRounded />}
                        label="Organization Info"
                        iconPosition="start"
                        sx={{ textTransform: "none" }}
                    />
                )}
                {!isDisabled && (
                    <Tab icon={<SchoolRounded />} label="Academic" iconPosition="start" sx={{ textTransform: "none" }} />
                )}
                <Tab icon={<SettingsIcon />} label="Password Settings" iconPosition="start" sx={{ textTransform: "none" }} />
            </Tabs>

            {/* Conditional rendering based on the selected tab */}
            {value === 0 && <UserProfile />}
            {value === 1 && (
                <>
                    {!orgInfoDisabled && <OrganizationInfo />}
                    {!isDisabled && <AcademicBackground />}
                    {userRole === 3 && <ChangePasswordForm />}
                    {userRole === 1 && <ChangePasswordForm />}
                </>
            )}
            {value === 2 && <ChangePasswordForm />}
        </DashboardContainer>
    );
};

export default AccountManagement;
// =========== End Account Management ===========

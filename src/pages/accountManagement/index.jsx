// React import
import { useState } from "react";

// MUI import
import { Tabs, Tab } from "@mui/material";

// Custom import
import PageTitle from "../../components/PageTitle";
import DashboardContainer from "../../components/styles/DashboardContainer";
import UserProfile from "./userProfile/index";
import ChangePasswordForm from "./changePassword";

// =========== Start Account Management ===========
const AccountManagement = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <DashboardContainer sx={{ display: "flex", gap: 3, flexDirection: "column", mb: 3 }}>
            <PageTitle title="My Profile" />

            {/* Tabs for User Profile, Bio Content, and Settings */}
            <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
                <Tab label="Profile" />
                <Tab label="Profile Settings" />
            </Tabs>

            {/* Conditional rendering based on the selected tab */}
            {value === 0 && <UserProfile />}
            {value === 1 && <ChangePasswordForm />}
        </DashboardContainer>
    );
};

export default AccountManagement;
// =========== End Account Management ===========
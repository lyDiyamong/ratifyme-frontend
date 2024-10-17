// React import
import { useState } from "react";

// MUI import
import { Tabs, Tab } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

// Custom import
import PageTitle from "../../components/PageTitle";
import DashboardContainer from "../../components/styles/DashboardContainer";
import UserProfile from "./userProfile/index";
import ChangePasswordForm from "./changePassword/";
import OrganizationInfo from "./organizationInfo";
import { BusinessRounded, SchoolRounded } from "@mui/icons-material";
import { useFetchInfoUserByIdQuery } from "../../store/api/users/userInfoProfileApi";
import { useSelector } from "react-redux";
import AcademicBackground from "./academicBackground";
import InstitutionProfileCard from "../organization/InstitutionProfileCard";

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
    const isDisabled = userRole === 3 || userRole === 2;
    const orgInfoDisabled = userRole === 3 || userRole === 4;

    return (
        <DashboardContainer sx={{ display: "flex", gap: 3, flexDirection: "column", mb: 3 }}>
            <PageTitle title="My Profile" />

            {/* Tabs for User Profile, Bio Content, and Settings */}
            <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
                <Tab icon={<PersonIcon />} label="Profile" iconPosition="start" />
                {!orgInfoDisabled && <Tab icon={<BusinessRounded />} label="Organization Info" iconPosition="start" />}
                {!isDisabled && <Tab icon={<SchoolRounded />} label="Academic" iconPosition="start" />}
                <Tab icon={<SettingsIcon />} label="Profile Settings" iconPosition="start" />
            </Tabs>

            {/* Conditional rendering based on the selected tab */}
            {value === 0 && <UserProfile />}
            {value === 1 && (
                <>
                    {!orgInfoDisabled && <OrganizationInfo />}
                    {!isDisabled && <AcademicBackground />}
                    {userRole === 3 && <ChangePasswordForm />}
                </>
            )}
            {value === 2 && <ChangePasswordForm />}
            {/* {value === 3 && <InstitutionProfileCard />} */}
        </DashboardContainer>
    );
};

export default AccountManagement;
// =========== End Account Management ===========

// React import
import { useState } from "react";

// MUI import
import { Tabs, Tab, Stack, Button, Typography } from "@mui/material";

// Custom import
import PageTitle from "../../../components/PageTitle";
import DashboardContainer from "../../../components/styles/DashboardContainer";
import UserProfile from "./UserProfile";
import theme from "../../../assets/themes";
import ProfileSetting from "./ProfileSetting";

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
            {value === 0 && (
                <Stack spacing={2}>
                    <UserProfile />
                </Stack>
            )}
            {value === 1 && (
                <Stack spacing={2} sx={{ p: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: theme.fontWeight.semiBold }}>
                        Profile Settings
                    </Typography>
                    <Button
                        sx={{
                            color: theme.palette.primary.main,
                            fontWeight: theme.fontWeight.semiBold,
                            backgroundColor: theme.palette.action.hover,
                            maxWidth: 200,
                            height: 40,
                            textTransform: "none",
                            borderRadius: theme.customShape.btn,
                        }}
                    >
                        Go to Settings
                    </Button>
                    <ProfileSetting/>
                </Stack>
            )}
        </DashboardContainer>
    );
};

export default AccountManagement;

//MUI Import 
import { Stack } from "@mui/material";
// Custom import
import PageTitle from "../../../components/PageTitle";
import UserProfile from "./UserProfile"

const AccountManagement = () => {
    return (
        <Stack gap={3} >
            <PageTitle title="Profile" />
            <UserProfile />
        </Stack>
    );
};

export default AccountManagement;

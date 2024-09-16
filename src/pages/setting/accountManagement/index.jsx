//MUI Import 
import { Stack } from "@mui/material";
// Custom import
import PageTitle from "../../../components/PageTitle";
import UserProfile from "./UserProfile"
import BioContent from "./BioContent"

const AccountManagement = () => {
    return (
        <Stack gap={3} >
            <PageTitle title="Profile" />
            <UserProfile />
            <BioContent />
        </Stack>
    );
};

export default AccountManagement;

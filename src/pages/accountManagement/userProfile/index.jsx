// MUI Import
import { Stack } from "@mui/material";

// Custom Import
import ProfileHeader from "./ProfileHeader";
import BioContent from "../BioContent";
import ProfileInfoContainer from "./ProfileInfo";

// =========== Start UserProfile ===========
const UserProfile = () => {
    return (
        <Stack spacing={2}>
            <Stack gap={3}>
                <ProfileHeader />
                <BioContent />
                <ProfileInfoContainer />
            </Stack>
        </Stack>
    );
};

export default UserProfile;
// =========== End UserProfile ===========
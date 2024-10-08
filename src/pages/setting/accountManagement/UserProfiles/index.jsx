import { Stack } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import BioContent from "../BioContent";
import ProfileInfoContainer from "./ProfileInfo";

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

import { Grid, Stack } from "@mui/material";

// Custom Import
import ProfileHeader from "./ProfileHeader";
import BioContent from "../BioContent";
import ProfileInfoContainer from "./ProfileInfo";

// =========== Start UserProfile ===========
const UserProfile = () => {
    return (
        <Stack>
            <Stack gap={3}>
                <Grid container spacing={3}>
                    {/* Profile Header and Bio Content in the same parent */}
                    <Grid item xss={12} md={4} sx={{ display: "flex", flexDirection: "column" }}>
                        <Stack spacing={3} direction="column">
                            <ProfileHeader />
                            <BioContent />
                        </Stack>
                    </Grid>

                    {/* Profile Info on the right side */}
                    <Grid item xss={12} md={8} sx={{ height: "100%" }}>
                        <Stack>
                            <ProfileInfoContainer />
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
};

export default UserProfile;
// =========== End UserProfile ===========

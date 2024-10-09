import { Grid, Stack, Typography } from "@mui/material";

// Custom Import
import ProfileHeader from "./ProfileHeader";
import BioContent from "../BioContent";
import ProfileInfoContainer from "./ProfileInfo";
import theme from "../../../assets/themes";

// =========== Start UserProfile ===========
const UserProfile = () => {
    return (
        <Stack >
            <Stack gap={3}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1565c0" }}>
                    Personal Information
                </Typography>
                <Grid container spacing={3} sx={{ height: "100%" }}>
                    {/* Profile Header and Bio Content in the same parent */}
                    <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column" }}>
                        <Stack
                            spacing={2}
                            direction="column"
                        >
                            <ProfileHeader/>
                            <BioContent  /> 
                        </Stack>
                    </Grid>

                    {/* Profile Info on the right side */}
                    <Grid item xs={12} md={8} sx={{ height: "100%" }}>
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

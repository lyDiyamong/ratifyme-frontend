import { Grid, Stack } from "@mui/material";

// Custom Import
import OrgProfileInfo from "./OrgProfileInfo";
import OrgProfileHeader from "./OrgProfileHeader";
import OrganizationBio from "./OrganizationBio";

const OrganizationInfo = () => {
    
    return (
        <Stack>
            <Stack gap={3}>
                <Grid container spacing={3}>
                    {/* Profile Header and Bio Content in the same parent */}
                    <Grid item xss={12} md={4}>
                        <Stack spacing={2} direction="column">
                            <OrgProfileHeader />
                            <OrganizationBio />
                        </Stack>
                    </Grid>

                    {/* Profile Info on the right side */}
                    <Grid item xss={12} md={8}>
                        <OrgProfileInfo />
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
};

export default OrganizationInfo;

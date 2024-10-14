import { Grid, Stack } from "@mui/material";

// Custom Import
import BioContent from "../BioContent";
import OrgProfileInfo from "./OrgProfileInfo";
import OrgProfileHeader from "./OrgProfileHeader";

const OrganizationInfo = () => {
    return (
        <Stack>
            <Stack gap={3}>
                <Grid container spacing={3} sx={{ height: "100%" }}>
                    {/* Profile Header and Bio Content in the same parent */}
                    <Grid item xss={12} md={4} sx={{ display: "flex", flexDirection: "column" }}>
                        <Stack spacing={2} direction="column">
                            <OrgProfileHeader />
                            <BioContent />
                        </Stack>
                    </Grid>

                    {/* Profile Info on the right side */}
                    <Grid item xss={12} md={8} sx={{ height: "100%" }}>
                        <Stack>
                            <OrgProfileInfo />
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
};

export default OrganizationInfo;

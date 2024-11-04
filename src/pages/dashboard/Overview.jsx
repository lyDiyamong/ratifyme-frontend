// MUI import
import { Box, Grid } from "@mui/material";

//Custom Import
import CardsList from "./OverviewCard";

// ============ Start Overview Seciton ============
const Overview = () => {
    return (
        <Box sx={{ pb: 4 }}>
            <Grid container spacing={4}>
                <Grid item sm={12} xs={12} md={12} xss={12} xl={12}>
                    <CardsList />
                </Grid>
            </Grid>
        </Box>
    );
};
export default Overview;

// ============ End Overview Seciton ============

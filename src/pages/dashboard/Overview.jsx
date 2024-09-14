//Custom Import
import CardsList from "./OverviewCard";
import DashboardContainer from "../../components/styles/DashboardContainer";
import Notification from "./Notification";
import { Grid } from "@mui/material";

// ============ Start Overview Seciton ============
const Overview = () => {
    return (
        <DashboardContainer sx={{pb: 4}}>
            <Grid container spacing={4}>
                <Grid item sm={12} xs={12} md={12} xss={12} xl={7}>
                    <CardsList />
                </Grid>
                <Grid item sm={12} xs={12} md={12} xss={12} xl={5}>
                    <Notification />
                </Grid>
            </Grid>
        </DashboardContainer>
    );
};

export default Overview;
// ============ End Overview Seciton ============

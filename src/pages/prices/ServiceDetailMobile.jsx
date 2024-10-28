// serviceDetailMobile
// MUI import
import { Grid, Box } from "@mui/material";

// Custom import
import theme from "../../assets/themes";

// eslint-disable-next-line react/prop-types
const ServiceDetailMobile = ({ rows, value, checkIcon }) => {
    // ============ Start render service table in mobile screen ============
    // Start checking value in row
    const getPlanValue = (row, value) => {
        switch (value) {
            case 0:
                return row.three_monthPlan === 1 ? checkIcon : row.three_monthPlan;
            case 1:
                return row.six_monthPlan === 1 ? checkIcon : row.six_monthPlan;
            default:
                return row.twelve_monthPlan === 1 ? checkIcon : row.twelve_monthPlan;
        }
    };
    // End checking value in row

    // eslint-disable-next-line react/prop-types
    const renderedRows = rows.map((row, index) => {
        const backgroundColor = index % 2 !== 0 ? theme.palette.primary.light : theme.palette.customColors.white;

        return (
            <Grid
                container
                key={index}
                sx={{
                    backgroundColor,
                    py: 2,
                }}
            >
                <Grid item xs={9} sx={{ px: 1 }}>
                    {row.name}
                </Grid>
                <Grid item xs={row.name ? 3 : 12} sx={{ textAlign: "center", verticalAlign: "center" }}>
                    {getPlanValue(row, value)}
                </Grid>
            </Grid>
        );
    });
    return <Box>{renderedRows}</Box>;
    // ============ End render service table in mobile screen ============
};

export default ServiceDetailMobile;

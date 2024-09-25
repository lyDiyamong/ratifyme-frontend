// React library import
// ServiceDetail Code
import { useState } from "react";

// MUI library import
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Grid, Tabs, Tab, useMediaQuery, Typography } from "@mui/material";

// Custom import
import ServiceDetailMobile from "./ServiceDetailMobile";
import { serviceRows as rows } from "../data/pricePage/serviceTable";
import theme from "../assets/themes";
import PriceCard from "./PriceCard";

// Api import
import { useGetServicePlanQuery } from "../store/api/subscription/subscriptionApi";

const ServiceDetail = ({ button }) => {
    // Fetching data from API

    const { data, isLoading, error } = useGetServicePlanQuery();
    const [value, setValue] = useState(0);
    // Start tab section when screen below medium size
    const isMediumScreen = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.md));

    // Handle loading and error states
    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error.error}</Typography>;

    const servicePlans = data?.data;

    // Function that renders each price card for each plan
    const renderPriceCards = servicePlans.map((item, index) => <PriceCard key={index} item={item} button={button} />);

    // Update the first row of serviceRows with dynamic data
    rows[0].three_monthPlan = renderPriceCards[0] || null;
    rows[0].six_monthPlan = renderPriceCards[1] || null;
    rows[0].twelve_monthPlan = renderPriceCards[2] || null;

    const checkIcon = (
        <Box display="flex" justifyContent="center">
            <TaskAltIcon
                sx={{
                    color: theme.palette.secondary.main,
                    fontSize: theme.typography.body1,
                }}
            />
        </Box>
    );

    // function that change value for each tab
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // End tab section when screen below medium size

    // ============= Start rendered table with price card =============
    // Start rendering row by map method
    const renderedRows = rows.map((row, index) => (
        <Grid
            spacing={1}
            container
            key={index}
            sx={{
                backgroundColor: index % 2 !== 0 ? theme.palette.primary.light : theme.palette.customColors.white,
                py: 2,
                px: 1,
            }}
        >
            <Grid item xs={3} sx={{ m: 0 }}>
                {row.name}
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "center", verticalAlign: "center" }}>
                {row.three_monthPlan === 1 ? checkIcon : row.three_monthPlan}
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "center", verticalAlign: "center" }}>
                {row.six_monthPlan === 1 ? checkIcon : row.six_monthPlan}
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "center", verticalAlign: "center" }}>
                {row.twelve_monthPlan === 1 ? checkIcon : row.twelve_monthPlan}
            </Grid>
        </Grid>
    ));
    // End rendering row by map method

    // Start setting values from mapping method into Box
    return (
        <Box>
            {isMediumScreen ? (
                <>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable" // Enables scrollable tabs
                        scrollButtons="auto"
                    >
                        <Tab label="Quarterly Plan" sx={{ fontWeight: theme.fontWeight.semiBold }} />
                        <Tab label="Midyear Plan" sx={{ fontWeight: theme.fontWeight.semiBold }} />
                        <Tab label="Annual Plan" sx={{ fontWeight: theme.fontWeight.semiBold }} />
                    </Tabs>
                    {value === 0 && <ServiceDetailMobile rows={rows} value={value} checkIcon={checkIcon} />}
                    {value === 1 && <ServiceDetailMobile rows={rows} value={value} checkIcon={checkIcon} />}
                    {value === 2 && <ServiceDetailMobile rows={rows} value={value} checkIcon={checkIcon} />}
                </>
            ) : (
                <>{renderedRows}</>
            )}
        </Box>
    );
    // End setting values from mapping method into Box

    // ============= End rendered table with price card =============
};

export default ServiceDetail;

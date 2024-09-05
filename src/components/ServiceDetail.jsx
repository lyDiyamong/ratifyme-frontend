// React library import
// ServiceDetail Code
import { useState } from "react";

// MUI library import
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Grid, Tabs, Tab, useMediaQuery } from "@mui/material";

// Custom import
import ServiceDetailMobile from "./ServiceDetailMobile";
import { serviceRows as rows } from "../data/pricePage/serviceTable";
import theme from "../assets/themes";

const ServiceDetail = () => {
    // Start tab section when screen below medium size
    // call useTheme to use config style
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
    const [value, setValue] = useState(0);
    const isMediumScreen = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.md));
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
            }}
        >
            <Grid item xs={3} sx={{ m: 0 }}>
                {row.name}
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "center", verticalAlign: "center", p: 0 }}>
                {row.three_monthPlan === 1 ? checkIcon : row.three_monthPlan}
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "center", verticalAlign: "center", p: 0 }}>
                {row.six_monthPlan === 1 ? checkIcon : row.six_monthPlan}
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "center", verticalAlign: "center", p: 0 }}>
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

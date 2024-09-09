// MUI import
import { Typography } from "@mui/material";

// Custom import
import theme from "../assets/themes";
import DashboardContainer from "./styles/DashboardContainer";

// Start current date function
const getCurrentDate = () => {
    const today = new Date();
    const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    return today.toLocaleDateString("en-US", options);
};

const PageTitle = ({ title }) => {
    return (
        // ============ Start Page Title ============
        <DashboardContainer
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: {md:3},
                marginTop: 2,
                bgcolor: theme.palette.background.default,
            }}
        >
            {/* Start Page Title */}
            <Typography
                variant="h4"
                sx={{
                    fontSize: theme.typography.h3,
                    fontWeight: theme.fontWeight.bold,
                    color: theme.palette.text.primary,
                }}
            >
                {title}
            </Typography>

            {/* Start Current Date */}
            <Typography variant="body2" sx={{ color: theme.palette.customColors.gray300 }}>
                {getCurrentDate()}
            </Typography>
        </DashboardContainer>
        // ============ End Page Title ============
    );
};

export default PageTitle;

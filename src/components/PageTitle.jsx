// MUI import
import { Box, Typography } from "@mui/material";

// Custom import
import theme from "../assets/themes";


// Start current date function
const getCurrentDate = () => {
    const today = new Date();
    const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    return today.toLocaleDateString("en-US", options);
};

const PageTitle = ({ title }) => {
    return (
        // ============ Start Page Title ============
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
        </Box>
        // ============ End Page Title ============
    );
};

export default PageTitle;

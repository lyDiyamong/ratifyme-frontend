// MUI import
import { Box, Stack, Typography } from "@mui/material";

// Custom import
import theme from "../assets/themes";

// Start current date function
const getCurrentDate = () => {
    const today = new Date();
    const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    return today.toLocaleDateString("en-US", options);
};

/**
 * DateSelectionForm Component
 *
 * @param {string} title - The name title of the page
 * @param {Object} sx - Additional style mui
 * @returns {JSX.Element} The rendered PageTitle component.
 */
const PageTitle = ({ title, sx, subtitle }) => {
    return (
        // ============ Start Page Title ============
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 5,
                bgcolor: theme.palette.background.default,
                ...sx,
            }}
        >
            <Stack direction="column">
                {/* Start Page Title */}
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: theme.typography.h2,
                        fontWeight: theme.fontWeight.bold,
                        color: theme.palette.text.primary,
                        lineHeight: 1.8
                    }}
                >
                    {title}
                </Typography>

                {/* Start Page Sub title  */}
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: theme.typography.body2,
                        color: theme.palette.text.secondary,
                    }}
                >
                    {subtitle}
                </Typography>
            </Stack>

            {/* Start Current Date */}
            <Typography variant="body2" sx={{ color: theme.palette.customColors.gray300 }}>
                {getCurrentDate()}
            </Typography>
        </Box>
        // ============ End Page Title ============
    );
};

export default PageTitle;

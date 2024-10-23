// MUI import
import { Stack, Typography } from "@mui/material";

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

// ============ Start Page Title ============
const PageTitle = ({ title, sx, subtitle }) => {
    return (
        <Stack
            direction={{ sm: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ md: "center" }}
            sx={{
                bgcolor: theme.palette.background.default,
                mt: 2,
                mb: 5,
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
                        lineHeight: 1.8,
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
            <Typography variant="body2" sx={{ color: theme.palette.customColors.gray300, pr: 1 }}>
                {getCurrentDate()}
            </Typography>
        </Stack>
    );
};

export default PageTitle;
 // ============ End Page Title ============
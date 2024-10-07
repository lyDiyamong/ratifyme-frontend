import React from "react";
import { Box, Typography } from "@mui/material";
import LoadingIconSvg from "../../assets/icons/spinnigLoad.svg";
import theme from "../../assets/themes";

/**
 * PageLoading Component
 *
 * A reusable loading component that displays a spinner and an optional message
 * when a page or process is loading.
 *
 * @param {Object} props - The component's props
 * @param {boolean} props.isLoading - Controls whether the loading overlay should be displayed.
 *                                    If true, the overlay with a loading spinner is shown.
 * @param {string} [props.message] - An optional message displayed below the spinner.
 *                                   If provided, it will appear centered on the screen.
 *
 * @returns {JSX.Element | null} The rendered loading overlay if `isLoading` is true, otherwise null.
 */

const PageLoading = ({ isLoading, message }) => {
    if (!isLoading) return null; // If not loading, don't render the component

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: theme.palette.customColors.white,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
        >
            <Box>
                <Box component="img" src={LoadingIconSvg} />
                {message && (
                    <Typography variant="h6" color="text.secondary" align="center">
                        {message}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default PageLoading;

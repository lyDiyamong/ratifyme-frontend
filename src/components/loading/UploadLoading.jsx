// React library import
import * as React from "react";
import PropTypes from "prop-types";

// MUI import
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

/**
 * Upload Loading Component
 *
 * A reusable input component for Uploading
 * You can use this component for your Uploading like image etc.
 *
 * @param {string} Form - <UploadLoading /> You can write this element in your loading
 * @param {string} Custom - <UploadLoading value={progress} color="red" /> You can change your own color like this
 */

// =========== Start UploadLoading ===========
const UploadLoading = ({ color = "#1a90ff", value, ...props }) => {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" sx={{ color: color }} value={value} {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="caption" component="div" sx={{ color: "text.secondary" }}>
                    {`${Math.round(value)}%`}
                </Typography>
            </Box>
        </Box>
    );
};

UploadLoading.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
    /**
     * Color of the spinner.
     * @default '#1a90ff'
     */
    color: PropTypes.string,
};

export default function CircularWithValueLabel() {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return <UploadLoading value={progress} />;
}
// =========== End UploadLoading ===========
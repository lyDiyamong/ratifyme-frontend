// MUI import
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

/**
 * SpinLoading Component
 *
 * A reusable loading component which you can custom you own color
 * Anyway the default color of the Spin Loading is Blue
 *
 * @param {string} Form <SpinLoading /> - Just import and then write this Element down
 * @param {string} Custom custom your own color just write <SpinLoading color="red" />
 * @param {string} Custom custom you own size, just to write <SpinLoading size={20} />
 */

// Styled LinearProgress component
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === "dark" ? "#308fe8" : "#1a90ff",
    },
}));

const SpinLoading = ({ color = "#1a90ff", size = 40, ...props }) => {
    return (
        <Box sx={{ position: "relative" }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[200],
                }}
                size={size}
                thickness={4}
                value={100}
                {...props}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: color,
                    animationDuration: "550ms",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: "round",
                    },
                }}
                size={size}
                thickness={4}
                {...props}
            />
        </Box>
    );
};

export { BorderLinearProgress, SpinLoading };

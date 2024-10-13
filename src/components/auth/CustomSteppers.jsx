import { StepLabel, StepConnector } from "@mui/material";
import { height, maxWidth, styled, width } from "@mui/system";

// Custom step icon component
export const CustomStepIcon = styled("div")(({ theme, ownerState }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: ownerState.completed
        ? theme.palette.primary.main
        : ownerState.active
        ? theme.palette.primary.main
        : "1px solid #e0e0e0",
    backgroundColor: ownerState.completed
        ? theme.palette.primary.main
        : ownerState.active
        ? theme.palette.primary.main
        : "none",
    color: ownerState.completed
        ? theme.palette.customColors.white
        : ownerState.active
        ? theme.palette.customColors.white
        : "#000",
    position: "relative",
}));

// Custom connector for vertical orientation
export const CustomConnector = styled(StepConnector)(({ theme }) => ({
    "&.MuiStepConnector-root": {
        position: "relative",
        marginLeft: 20,
    },
    "& .MuiStepConnector-line": {
        borderLeftWidth: 2,
        height: 60,
        minHeight: 90,
        borderColor: theme.palette.customColors.gray200,
    },
}));

// Custom step label component
export const CustomStepLabel = styled(StepLabel)(({ theme, ownerState }) => ({
    "& .MuiStepLabel-label": {
        color: ownerState.completed
            ? theme.palette.primary.dark
            : ownerState.active
            ? theme.palette.primary.main
            : "#999",
        fontWeight: ownerState.active || ownerState.completed ? "bold" : "normal",
        fontSize: "14px",
        maxWidth: '120px',

        // Handling responsive breakpoints
        [theme.breakpoints.up("md")]: {
            display: "block",
        },
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}));

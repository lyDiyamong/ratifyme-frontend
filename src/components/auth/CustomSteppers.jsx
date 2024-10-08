import { StepLabel, StepConnector } from "@mui/material";
import { styled } from "@mui/system";

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

// Custom connector to match the line style
export const CustomConnector = styled(StepConnector)(({ theme }) => ({
    "&.MuiStepConnector-root": {
        top: "25%",
        position: "absolute",
        transform: "translateY(-50%)",
    },
    "& .MuiStepConnector-line": {
        borderColor: theme.palette.customColors.gray200,
        top: "50%",
        position: "absolute",
        left: 0,
        right: 0,
        transform: "translateY(-50%)",
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

        // Handling responsive breakpoints
        [theme.breakpoints.up("md")]: {
            display: "block",
        },
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}));

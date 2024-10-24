// MUI import
import { StepLabel, StepConnector } from "@mui/material";
import { Business, HomeOutlined, LockOutlined, ManageAccountsOutlined, PersonOutline } from "@mui/icons-material";
import { styled } from "@mui/system";

export const GetStepIcon = (label) => {
    switch (label) {
        case "General Info":
            return <PersonOutline />;
        case "Address Info":
            return <HomeOutlined />;
        case "Institution Info":
            return <Business/>;
        case "Account Setup":
            return <ManageAccountsOutlined />;
        case "Password Setup":
            return <LockOutlined />;
        default:
            return null;
    }
};

export const CustomStepIcon = styled("div")(({ theme, ownerState }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: "50%",
    transition: "all 0.3s ease-in-out",
    backgroundColor: ownerState.completed
        ? theme.palette.primary.main
        : ownerState.active
        ? theme.palette.primary.main
        : "#D8ECFF",
    color: ownerState.completed || ownerState.active ? theme.palette.customColors.white : theme.palette.primary.main,
    position: "relative",
    fontSize: 32,
    "& svg": {
        fontSize: 28,
    },
    "&:hover": {
        transform: "scale(1.1)",
    },
    [theme.breakpoints.down("xs")]: {
        width: 30,
        height: 30,
        fontSize: 18,
        "& svg": {
            fontSize: 18,
        },
    },
}));

// Custom connector with enhanced line thickness and color
export const CustomConnector = styled(StepConnector)(({ theme, ownerState }) => ({
    "&.MuiStepConnector-root": {
        top: "25%",
        position: "absolute",
        transform: "translateY(-50%)",
        [theme.breakpoints.down("sm")]: {
            top: "50%",
        },
    },
    "& .MuiStepConnector-line": {
        borderColor: theme.palette.primary.main,
        top: "50%",
        position: "absolute",
        left: 0,
        right: 0,
        transform: "translateY(-50%)",
        borderWidth: 1,
        borderStyle: ownerState.completed ? "solid" : "dashed",
        margin: "0 8px",
    },
}));

// Custom StepLabel with enhanced font styles
export const CustomStepLabel = styled(StepLabel)(({ theme, ownerState }) => ({
    "& .MuiStepLabel-label": {
        color: ownerState.completed ? theme.palette.primary.main : ownerState.active ? theme.palette.primary.main : "#999",
        fontSize: "14px",
        transition: "color 0.3s ease-in-out",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}));

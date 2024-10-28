import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ShareIcon from "@mui/icons-material/Share";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { Business } from "@mui/icons-material";
import { Box, Grid, Paper } from "@mui/material";
import LandingContainer from "../../components/styles/LandingContainer";

// Colorlib Connector Style
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: "linear-gradient( 95deg, #07C8F9 0%, #09A6F3 50%,#0C63E7 100%)",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: "linear-gradient( 95deg, #07C8F9 0%,#09A6F3 50%,#0C63E7 100%)",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: "#eaeaf0",
        borderRadius: 1,
    },
}));

// Colorlib Step Icon Style
const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        backgroundImage: "linear-gradient( 136deg, #07C8F9 0%, #09A6F3 50%, #0C63E7 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
        backgroundImage: "linear-gradient( 136deg, #07C8F9 0%, #09A6F3 50%, #0C63E7 100%)",
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, icon } = props;

    const icons = {
        1: <Business />,
        2: <BusinessCenterIcon />,
        3: <EmojiEventsIcon />,
        4: <ShareIcon />,
    };

    return <ColorlibStepIconRoot ownerState={{ completed, active }}>{icons[String(icon)]}</ColorlibStepIconRoot>;
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const steps = [
    {
        label: "INSTITUTION",
        description: "Institutions provide credentials that represent achievements and skills.",
        icon: <Business />,
    },
    {
        label: "ISSUE",
        description: "Organizations ISSUE badges for things they teach or facilitate.",
        icon: <BusinessCenterIcon />,
    },
    { label: "EARN", description: "Users EARN badges when they showcase their professional skills.", icon: <EmojiEventsIcon /> },
    {
        label: "BROADCAST",
        description: "Users can share achievements to showcase their potential.",
        icon: <ShareIcon />,
    },
];

export default function DigitalBadgeFlowStepper() {
    return (
        <LandingContainer>
            <Stack sx={{ width: "100%" }} spacing={4}>
                <Stepper alternativeLabel activeStep={steps.length - 1} connector={<ColorlibConnector />}>
                    {steps.map((step) => (
                        <Step key={step.label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{step.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Grid container justifyContent="center">
                    {steps.map((step) => (
                        <Grid item xss={12} sm={6} md={3} p={1} key={step.label}>
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    textAlign: "center",
                                    backgroundImage: "linear-gradient(135deg, #0C63E7, #37A2F7)",
                                    height: "100%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                    }}
                                >
                                    {step.icon}
                                </Box>
                                <Typography variant="body1" mt={2} color="white">
                                    {step.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </LandingContainer>
    );
}

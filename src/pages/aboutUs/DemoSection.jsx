import LandingContainer from "../../components/styles/LandingContainer";
import { Box, Stack, Typography } from "@mui/material";
import ArrowStyleIcon from "../../assets/images/ArrowStyleIcon.svg";
import ArrowStyleIRotatecon from "../../assets/images/ArrowStyleIRotatecon.svg";
import theme from "../../assets/themes";

const DemoSection = () => {
    return (
        <LandingContainer>
            <Stack sx={{ justifyContent: "center", alignItems: "center", gap: 3 }}>
                <Stack sx={{ flexDirection: "row", gap: 2 }}>
                    <Box component="img" src={ArrowStyleIcon} alt="Icon" />
                    <Typography textTransform="uppercase" textAlign="center" variant="h4" fontWeight={theme.fontWeight.semiBold}>
                        About the Open badge concept
                    </Typography>
                    <Box component="img" src={ArrowStyleIRotatecon} alt="Icon" />
                </Stack>
                <Box sx={{ maxWidth: 1200, width: "100%" , height: 800}}>
                    <iframe
                        width="100%"
                        height={800}
                        src="https://www.youtube.com/embed/OVDytP0szF4"
                        title="ToDesktop Demo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </Box>
            </Stack>
        </LandingContainer>
    );
};

export default DemoSection;

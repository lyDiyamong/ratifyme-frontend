// React library import
import { useState } from "react";

// MUI import
import { Box, Button, Stack, Typography } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";

// Custom import
import ArrowStyleIcon from "../../assets/images/ArrowStyleIcon.svg";
import ArrowStyleIRotatecon from "../../assets/images/ArrowStyleIRotatecon.svg";
import LandingContainer from "../../components/styles/LandingContainer";
import LandingDemo from "../../assets/images/LandingDemo.svg";
import DigitalCredentailVideo from "../../assets/images/Digital_CredentailVideo.mp4";
import theme from "../../assets/themes";

const DemoSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayVideo = () => {
        setIsPlaying(true);
    };

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
                <Box sx={{ maxWidth: 1200, width: "100%" }}>
                    {!isPlaying ? (
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                maxWidth: 1200,
                                cursor: "pointer",
                            }}
                            onClick={handlePlayVideo}
                        >
                            <Box
                                component="img"
                                src={LandingDemo}
                                alt="background"
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "cover",
                                    backgroundColor: "black",
                                    opacity: 0.9,
                                    borderRadius: theme.customShape.section,
                                    border: "2px solid #E4E5EB",
                                }}
                            />
                            <Button
                                variant="contained"
                                startIcon={<PlayCircle />}
                                color="primary"
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    color: "white",
                                    textTransform: "none",
                                    fontWeight: theme.fontWeight.bold,
                                    fontSize: { md: "20px", sm: "16px", xs: "10px", xss: "8px" },
                                    boxShadow: theme.customShadows.default,
                                    px: { md: 3, xss: 1 },
                                }}
                            >
                                Watch: Open Badge
                            </Button>
                        </Box>
                    ) : (
                        <Box
                            component="video"
                            src={DigitalCredentailVideo}
                            autoPlay
                            controls
                            sx={{
                                width: "100%",
                                objectFit: "cover",
                                borderRadius: theme.customShape.section,
                                border: "2px solid #E4E5EB",
                            }}
                        />
                    )}
                </Box>
            </Stack>
        </LandingContainer>
    );
};

export default DemoSection;

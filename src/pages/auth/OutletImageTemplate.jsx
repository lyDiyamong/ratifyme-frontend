import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import BusinessStartupSvg from "../../assets/images/DrawKitDashbaord.svg";
import DashboardSvg from "../../assets/images/FutureTechnology.svg";
import theme from "../../assets/themes";

const images = [BusinessStartupSvg, DashboardSvg];
const texts = ["Capturing Moments, Creating Memories", "Welcome to RatifyMe"];

const OutletImageComponent = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [currentText, setCurrentText] = useState(0);

    // Change background image and text
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
            setCurrentText((prevText) => (prevText + 1) % texts.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                display: { xss: "none", sm: "none", md: "flex" },
                backgroundColor: theme.palette.action.selected,
                alignItems: "center",
                justifyContent: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "100vh",
                width: "50%",
            }}
        >
            <Box
                flex={1}
                sx={{
                    backgroundImage: `url(${images[currentImage]})`,
                    backgroundColor: theme.palette.action.selected,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "60vh",
                    width: "100%",
                }}
            />

            <Typography
                variant="h4"
                sx={{
                    position: "absolute",
                    top: "95%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: theme.palette.text.primary,
                    maxWidth: 200,
                    animation: "fadeInOut 5s ease-in-out infinite",
                    textAlign: "center",
                }}
            >
                {texts[currentText]}
            </Typography>

            {/* Fade-in and fade-out animation */}
            <style>
                {`
                @keyframes fadeInOut {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `}
            </style>
        </Box>
    );
};

export default OutletImageComponent;

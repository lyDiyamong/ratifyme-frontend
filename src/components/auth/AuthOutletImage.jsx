import { Box, Stack, Typography } from "@mui/material";
import theme from "../../assets/themes";

const AuthOutletImage = ({ image, backgroundColor = theme.palette.primary.light, title1, title2, description }) => {
    return (
        <Box
            sx={{
                position: "relative",
                display: { xss: "none", sm: "none", md: "flex" },
                backgroundColor: backgroundColor,
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "50%",
                overflow: "hidden",
            }}
        >
            <Box
                flex={1}
                sx={{
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    opacity: "0.3",
                    filter: "blur(2px)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}
            />

            <Box
                component="img"
                src={image}
                sx={{
                    position: "relative",
                    opacity: "0.3",
                    filter: "blur(3px)",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />

            <Stack
                direction="column"
                spacing={2}
                sx={{
                    position: "absolute",
                    color: theme.palette.customColors.white,
                    px: "80px",
                    textWrap: "wrap",
                }}
            >
                <Typography
                    variant="h1"
                    fontWeight="bold"
                    sx={{
                        animation: "bounceIn 2s ease-in-out",
                    }}
                >
                    {title1}
                </Typography>
                <Typography
                    variant="h1"
                    fontWeight="bold"
                    sx={{
                        animation: "bounceIn 2s ease-in-out 0.5s",
                    }}
                >
                    {title2}
                </Typography>
                <Typography
                    letterSpacing={1.2}
                    variant="body1"
                    maxWidth="720px"
                    textAlign="justify"
                    sx={{
                        animation: "bounceIn 2s ease-in-out 1s",
                    }}
                >
                    {description}
                </Typography>
            </Stack>

            <style>
                {`
                @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: translateY(-50px);
                    }
                    60% {
                        opacity: 1;
                        transform: translateY(15px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>
        </Box>
    );
};

export default AuthOutletImage;

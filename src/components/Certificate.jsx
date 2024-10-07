// React import
import { forwardRef } from "react";

// MUI import
import { Box, Typography } from "@mui/material";

// Custom import
import theme from "../assets/themes";
// import AnBSchoolLogo from "../assets/images/AnBSchoolLogo.svg";
import certWave from "../assets/images/certWave.jpg";
import BadgeImg from "../assets/images/BadgeImg.png";
import { Stack } from "@mui/system";

// eslint-disable-next-line react/display-name
const Certificate = forwardRef(({ recipientName, date, badge }, ref) => (
    <Stack
        ref={ref}
        sx={{
            maxWidth: "1000px",
            height: 700,
            width: "100%",
            border: "10px solid #ffffff",
            padding: 3,
            alignItems: "center",
            position: "relative",
            textAlign: "center",
            backgroundColor: theme.palette.customColors.white,
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${certWave})`, // Apply a transparent overlay
            backgroundSize: "cover",
            backgroundPosition: "center",
            justifyContent: "center",
        }}
    >
        <Box
            sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
            }}
        >
            <Typography
                sx={{
                    color: theme.palette.text.primary,
                    letterSpacing: 2,
                    fontSize: theme.typography.h2,
                    lineHeight: 2,
                    fontWeight: theme.fontWeight.bold,
                    textTransform: "uppercase",
                }}
            >
                ABOVE AND BEYOND SCHOOL
            </Typography>
        </Box>

        <Box
            sx={{
                mt: 2,
            }}
        >
            <Typography
                sx={{
                    color: theme.palette.text.disabled,
                    letterSpacing: 2,
                    fontSize: theme.typography.body2,
                    lineHeight: 2,
                    fontWeight: theme.fontWeight.bold,
                }}
            >
                Certifies that
            </Typography>
            {/* Badge name */}
            <Typography variant="h2" fontWeight="bold" gutterBottom>
                {recipientName}
            </Typography>

            <Typography
                sx={{
                    color: theme.palette.text.disabled,
                    letterSpacing: 2,
                    fontSize: theme.typography.body2,
                    lineHeight: 2,
                    fontWeight: theme.fontWeight.bold,
                }}
            >
                successfully completed all requirements in
            </Typography>
            <Typography
                sx={{
                    fontSize: theme.typography.h1,
                    color: theme.palette.text.primary,
                    fontWeight: theme.fontWeight.bold,
                    lineHeight: 2,
                }}
            >
                {badge?.name}
            </Typography>
            <Box component="img" src="https://ratifyme.s3.ap-southeast-2.amazonaws.com/Badges/Bagde+Image.png" alt={badge?.name || "Badge"} maxWidth={100} maxHeight={100} />
            <Typography
                sx={{
                    fontSize: theme.typography.body2,
                    color: theme.palette.text.disabled,
                    lineHeight: 2,
                }}
            >
                This badge certifies advanced knowledge of web development.
            </Typography>
            {/* Issuer name */}
            <Typography
                sx={{
                    fontSize: theme.typography.body2,
                }}
            >
                Issuer:{" "}
                <Typography
                    component="span"
                    sx={{
                        fontSize: theme.typography.body2,
                        color: theme.palette.text.primary,
                        fontWeight: theme.fontWeight.bold,
                    }}
                >
                    {badge?.Issuer?.User?.name || "Mary Jane"}
                </Typography>
            </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
                Issued On: {date}
            </Typography>
        </Box>
    </Stack>
));

export default Certificate;

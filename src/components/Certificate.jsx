// React import
import { forwardRef } from "react";

// MUI import
import { Badge, Box, Typography } from "@mui/material";

// Custom import
import theme from "../assets/themes";
import AnBSchoolLogo from "../assets/images/AnBSchoolLogo.svg";
import BadgeImg from "../assets/images/BadgeImg.png";
import { Stack } from "@mui/system";

// eslint-disable-next-line react/display-name
const Certificate = forwardRef(({ recipientName, courseName, date, badge }, ref) => (
    <Stack
        ref={ref}
        sx={{
            width: "800px",
            border: "10px groove #1976d2",
            padding: 3,
            alignItems: "center",
            position: "relative",
            backgroundColor: theme.palette.background.default,
            textAlign: "center"
        }}
    >
        <Box sx={{
            display: "flex",
            gap: 2,
            alignItems: "center"
        }}>
            <Box
                sx={{
                    width: 80,
                    objectFit: "cover",
                }}
            >
                <Box
                    sx={{ maxWidth: "100%", height: "auto" }}
                    component="img"
                    src={AnBSchoolLogo}
                    alt="Institution logo"
                />
            </Box>
            <Typography sx={{
                    color: theme.palette.text.primary,
                    letterSpacing: 2,
                    fontSize: theme.typography.h2,
                    lineHeight: 2,
                    fontWeight: theme.fontWeight.bold,
                    textTransform: "uppercase",
                }} >
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
                    fontSize: theme.typography.body1,
                    lineHeight: 2,
                    fontWeight: theme.fontWeight.bold,
                    textTransform: "uppercase",
                }}
            >
                Certificate of Completion
            </Typography>
            {/* Badge name */}
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
            {/* Issuer name */}
            <Typography>
                Issuer:{" "}
                <Typography
                    component="span"
                    sx={{
                        fontSize: theme.typography.body1,
                        color: theme.palette.text.primary,
                        fontWeight: theme.fontWeight.bold,
                    }}
                >
                    {badge?.Issuer?.User?.name || "Mary Jane"}
                </Typography>
            </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {courseName}
            </Typography>

            <Box component="img" src={BadgeImg} alt={badge?.name || "Badge"} maxWidth={100} maxHeight={100} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {recipientName}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
                Issued On: {date}
            </Typography>
        </Box>
    </Stack>
));

export default Certificate;

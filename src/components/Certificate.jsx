// React library import
import { forwardRef } from "react";

// MUI import
import { Box, Divider, Typography, Stack } from "@mui/material";

// Custom import
import certWave from "../assets/images/certWave.jpg";
import theme from "../assets/themes";
import FormatDate from "../utils/formatDate";
import RatfiyME from "../assets/icons/RatifyME-Fevicon.svg";

// =========== Start Certificate ===========
// eslint-disable-next-line react/display-name
const Certificate = forwardRef(({ recipientName, badge, earnerAchieve }, ref) => (
    <Stack
        ref={ref}
        sx={{
            minWidth: "1000px",
            maxWidth: "1000px",
            height: 700,
            border: "10px solid #ffffff",
            padding: 3,
            gap: 3,
            position: "relative",
            textAlign: "center",
            backgroundColor: theme.palette.customColors.white,
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${certWave})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            justifyContent: "center",
        }}
    >
        <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
            <Box sx={{ width: 40, height: 40 }} component="img" src="https://ratifyme.s3.ap-southeast-2.amazonaws.com/Logo/RatifyME-Fevicon.svg" alt="RatifyMe" />
            <Divider sx={{ height: 45, borderColor: "black" }} orientation="vertical" />
            <Stack justifyContent="start" alignItems="start">
                <Typography variant="h3" fontWeight={theme.fontWeight.semiBold}>
                    RatifyMe
                </Typography>
                <Typography variant="body2">
                    RatifyMe by{" "}
                    <Typography
                        component="span"
                        sx={{ color: theme.palette.primary.main, fontWeight: theme.fontWeight.semiBold }}
                    >
                        TechA
                    </Typography>
                </Typography>
            </Stack>
        </Stack>

        <Stack>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "center",
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
                    {badge?.Institution?.institutionName}
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
                <Box sx={{ maxWidth: "100%", overflowWrap: "break-word", paddingX: 3 }}>
                    <Typography
                        sx={{
                            fontSize: theme.typography.h1,
                            color: theme.palette.text.primary,
                            fontWeight: theme.fontWeight.bold,
                            lineHeight: 1.2,
                            textAlign: "center",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                            maxWidth: "100%",
                            textWrap: "wrap",
                        }}
                    >
                        {badge?.name}
                    </Typography>
                </Box>

                {/* Badge image */}
                <Box component="img" src={badge?.imageUrl} alt={badge?.name} sx={{ maxWidth: 200, height: 200, objectFit:"contain" }} />

                {/* Certificate description */}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                        sx={{
                            fontSize: theme.typography.body2,
                            color: theme.palette.text.disabled,
                            lineHeight: 2,
                            width: 500,
                            textWrap: "wrap",
                            textAlign: "center",
                        }}
                    >
                        {badge?.description}
                    </Typography>
                </Box>
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
                        {`${badge?.Issuer?.User?.firstName} ${badge?.Issuer?.User?.lastName}` || "N/A"}
                    </Typography>
                </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                    Issued On: {FormatDate(earnerAchieve?.issuedOn)}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                    Claimed On: {FormatDate(earnerAchieve?.claimedOn)}
                </Typography>
            </Box>
        </Stack>
    </Stack>
));

export default Certificate;
// =========== End Certificate ===========

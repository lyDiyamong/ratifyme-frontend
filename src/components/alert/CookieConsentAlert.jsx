// React Import
import { useState, useEffect } from "react";

// MUI Import
import { Box, Typography, Button } from "@mui/material";

// Custom Import
import cookieImage from "../../assets/images/cookie-img.jpg";
import theme from "../../assets/themes";

const CookieConsentAlert = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Check if user has already given consent
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setOpen(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "true");
        setOpen(false);
    };

    if (!open) return null;

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                bgcolor: "white",
                boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                p: 4,
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    maxWidth: "900px",

                    mx: "auto",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: theme.fontWeight.semiBold,
                        color: theme.palette.text.primary,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    We use Cookie
                    <Box
                        component="img"
                        src={cookieImage}
                        alt="Cookies"
                        sx={{ width: "60px", height: "60px", objectFit: "contain" }}
                    />
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        mt: 1,
                        mb: 3,
                        color: theme.palette.text.secondary,
                    }}
                >
                    This website uses cookies that are needed for the site to work properly and to get data on how you interact
                    with it. By accepting, you agree to the use of cookies as described in our{" "}
                    <a
                        href="/cookiePolicy"
                        target="_blank"
                        style={{ color: theme.palette.primary.main, fontWeight: theme.fontWeight.semiBold }}
                    >
                        Cookie policy
                    </a>
                    .
                </Typography>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "end" }}>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: theme.palette.primary.main,
                            color: "white",
                            borderRadius: "8px",
                            px: { md: 4, xss: 2 },
                            fontWeight: "bold",
                            "&:hover": {
                                bgcolor: theme.palette.primary.dark,
                            },
                        }}
                        onClick={handleAccept}
                    >
                        OK
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CookieConsentAlert;

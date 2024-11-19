// React Import
import { useState, useEffect } from "react";

// MUI Import
import { Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Custom Import
import cookie from "../../assets/images/cookie-img.jpg";
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
                bottom: 30,
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: theme.palette.customColors.white,
                boxShadow: 3,
                borderRadius: 2,
                p: 3,
                maxWidth: 500,
                display: "flex",
                alignItems: "center",
                gap: 2,
                zIndex: 9999,
            }}
        >
            {/* Image */}
            <Box component="img" src={cookie} alt="Cookie" sx={{ width: 150, height: 150 }} />

            {/* Content */}
            <Box sx={{ flexGrow: 1 }}>
                <Typography
                    sx={{
                        fontSize: theme.typography.h3,
                        fontWeight: theme.fontWeight.bold,
                    }}
                >
                    We use cookies
                </Typography>
                <Typography sx={{ mt: 1, fontSize: theme.typography.body1, fontWeight: theme.fontWeight.semiBold }}>
                    This website uses cookies to enhance your experience.
                </Typography>

                {/* Buttons */}
                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAccept}
                        sx={{
                            fontSize: theme.typography.h4,
                            fontWeight: theme.fontWeight.bold,
                            color: theme.palette.customColors.white,
                        }}
                    >
                        Accept
                    </Button>
                </Box>
            </Box>

            {/* Close Button */}
            <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", top: 8, right: 8 }}>
                <CloseIcon />
            </IconButton>
        </Box>
    );
};

export default CookieConsentAlert;

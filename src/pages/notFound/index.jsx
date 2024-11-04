// React import
import { useNavigate } from "react-router";

// MUI import
import { Box, Button, Typography } from "@mui/material";

// Custom import
import NotFoundSvg from "../../assets/images/NotFound.svg";
import theme from "../../assets/themes";

// API import
import { useCheckAuthQuery } from "../../store/api/auth/authApi";

const NotFoundPage = () => {
    const {data} = useCheckAuthQuery()
    // Navigate hook
    const navigate = useNavigate();
    return (
        // ============ Start NotFoundPage ============
        <Box
            component="section"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                }}
            >
                <Box sx={{ position: "absolute", top: "12%", left: "50%", transform: "translateX(-50%)" }}>
                    <Typography variant="h1">Page Not Found</Typography>
                </Box>
                <Box
                    sx={{
                        maxWidth: "1000px",
                    }}
                    component="img"
                    src={NotFoundSvg}
                />
            </Box>
            <Typography variant="h4">Sorry the page you're looking for doesn't exist</Typography>
            <Box
                sx={{
                    mt: 3,
                }}
            >
                <Button
                    onClick={() => navigate(data? "/dashboard" : "/")}
                    variant="contained"
                    sx={{
                        color: theme.palette.customColors.white,
                        borderRadius: theme.customShape.btn,
                    }}
                >
                    Go back to {data ? "Dashboard" : "Home"}
                </Button>
            </Box>
        </Box>
        // ============ End NotFoundPage ============
    );
};

export default NotFoundPage;

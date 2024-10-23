import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageNotFoundImage from "../assets/images/PageNotFoundWise.png";
import theme from "../assets/themes";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            textAlign="center"
        >
            <Box component="img" alt="404 - Page Not Found" src={PageNotFoundImage} maxWidth={600} width="100%" />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Oops! Page not found.
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                It looks like you're lost. Let's get you back on track.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
                sx={{ mt: 2, color: "white", textTransform: "none", fontWeight: theme.fontWeight.bold }}
            >
                Back to RatifyME
            </Button>
        </Box>
    );
};

export default PageNotFound;

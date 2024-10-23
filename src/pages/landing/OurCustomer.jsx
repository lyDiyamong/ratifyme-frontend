
// MUI import
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// Custom import
import LogoCards from "./CompanyLogoCard.jsx";

//Our Customer Component
function OurCustomer() {
    const theme = useTheme();
    return (
        //============ Start Our Customer Section  ============
        <Box
            component="section"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                margin: "0",
                width: "100%",
                maxWidth: "none",
                backgroundColor: theme.palette.primary.dark,
                minHeight: "248px",
                padding: "0",
            }}
        >
            {/* Start Tittle   */}
            <Box
                component="div"
                sx={{
                    color: "white",
                    textAlign: "center",

                    fontWeight: theme.fontWeight.bold,
                    fontSize: theme.typography.h4,
                }}
            >
                <Box component="p">Our Customer</Box>
            </Box>
            {/*  End Tittle   */}

            <LogoCards />
        </Box>
        //============ End Our Customer Section  ============
    );
}

export default OurCustomer;

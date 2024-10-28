// MUI import
import { Box } from "@mui/material";

// =========== Start LandingContainer ===========
const LandingContainer = ({ children, sx }) => {
    return <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto", px: "32px", ...sx }}>{children}</Box>;
};

export default LandingContainer;
// =========== End LandingContainer ===========
